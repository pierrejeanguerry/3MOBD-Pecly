import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { format, addHours } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { useAppointment } from "@/contexts/appointmentContext";
import { useCaregiver } from "@/contexts/caregiverContext";
import Checkbox from "expo-checkbox";
import Button from "@/components/Button";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { DatabaseError, ERROR_MESSAGES } from "@/utils/errors";
import { theme } from "@/styles/theme";
import Spinner from "react-native-loading-spinner-overlay";
import * as Notifications from "expo-notifications";
import {
  formatCaregiver,
  formatMotive,
  formatName,
} from "@/utils/formatString";
import { AppointmentData } from "@/types/appointment";
import { User } from "@/types/user";
import { getNotificationPermission } from "@/utils/scheduleNotification";
import { getTodayTimestamp } from "@/utils/manageTimestamp";

export default function Summary() {
  const { user } = useAuth();
  const { appointmentData } = useAppointment();
  const { caregiverData } = useCaregiver();
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const conditions = [
    {
      title: "Soignant",
      value: caregiverData?.name ? formatCaregiver(caregiverData?.name) : null,
    },
    {
      title: "Date du rendez-vous",
      value: appointmentData?.dateTime
        ? format(appointmentData.dateTime.toDate(), "dd/MM/yyyy à HH:mm", {
            locale: fr,
          })
        : null,
    },
    { title: "Raison", value: formatMotive(appointmentData?.motive) || null },
    {
      title: "Adresse",
      value: caregiverData?.address
        ? `${formatName(caregiverData.address.street)}\n${
            caregiverData.address.postalCode
          }, ${formatName(caregiverData.address.city)}`
        : null,
    },
  ].filter((condition) => condition.value !== null);

  const [checkedConditions, setCheckedConditions] = useState<{
    [key: string]: boolean;
  }>(
    Object.fromEntries(conditions.map((condition) => [condition.title, false]))
  );

  function updateCheckedCondition(title: string, isChecked: boolean) {
    setCheckedConditions((prev) => {
      const updatedConditions = { ...prev, [title]: isChecked };
      const allChecked =
        Object.keys(updatedConditions).length === conditions.length &&
        Object.values(updatedConditions).every(Boolean);
      setIsDisabled(!allChecked);
      return updatedConditions;
    });
  }

  async function handlePress() {
    if (!user) {
      router.push("/account/login");
      return;
    }
    setLoading(true);
    if (!appointmentData) throw new DatabaseError(ERROR_MESSAGES.FETCH_ERROR);
    if (!appointmentData.dateTime) return;
    const date = appointmentData.dateTime?.toDate();
    const slot = `${
      date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
    }:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`;

    try {
      const isAlreadyReserved = await firestore()
        .collection("Appointments")
        .where("caregiverId", "==", caregiverData?.id)
        .where("dateTime", "==", appointmentData.dateTime)
        .get();

      if (!isAlreadyReserved.empty)
        throw new DatabaseError(ERROR_MESSAGES.SLOT_ERROR);

      await firestore().collection("Appointments").add({
        caregiverId: appointmentData.caregiverId,
        dateTime: appointmentData.dateTime,
        motive: appointmentData.motive,
        patientId: user.id,
        isPassed: false,
      });
      const slotDate: Date = date;
      slotDate.setHours(0, 0, 0, 0);
      const slotTimestamp = Timestamp.fromDate(slotDate);

      const oldAvailabilityRef = await firestore()
        .collection("Users")
        .doc(appointmentData.caregiverId)
        .collection("Availabilities")
        .where("date", "==", slotTimestamp)
        .get();

      if (!oldAvailabilityRef.empty) {
        await oldAvailabilityRef.docs[0].ref.update({
          slots: firestore.FieldValue.arrayRemove(slot),
          slotsCount: firestore.FieldValue.increment(-1),
        });
      }

      const userRef = firestore().doc(`Users/${user.id}`);

      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) throw new DatabaseError(ERROR_MESSAGES.USER_NOT_FOUND);

      let { history = [] } = userData;

      history = history.filter(
        (id: string) => id !== appointmentData.caregiverId
      );

      history.push(appointmentData.caregiverId);

      await userRef.update({ history });

      scheduleReminder(appointmentData, caregiverData);
      setLoading(false);

      router.push("/(tabs)/home/search/caregiver/confirmed");
    } catch (e) {
      setLoading(false);
      console.error("Erreur Firestore:", e);
      router.push("/(tabs)/home/search/caregiver/error");
    }
  }

  async function scheduleReminder(
    appointment: AppointmentData,
    caregiver: User | undefined
  ) {
    if (!caregiver) return;
    const permission = await getNotificationPermission();
    if (permission !== "granted" || !appointment) return;

    const date = appointment.dateTime?.toDate();
    if (!date) return;

    const reminderDate = new Date(date);
    reminderDate.setDate(reminderDate.getDate() - 1);
    reminderDate.setHours(9, 0, 0, 0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Rappel de Rendez-vous",
        body: `Rendez-vous le ${format(
          new Date(date),
          "dd/MM/yyyy"
        )} à avec ${formatCaregiver(caregiver.lastname)} pour ${
          appointment.motive
        }`,
        sound: true,
      },
      trigger: {
        date: reminderDate,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: ``,
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: "white",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Récapitulatif</Text>
        {conditions.map(({ title, value }) => (
          <Condition
            key={title}
            title={title}
            value={value}
            onCheckedChange={updateCheckedCondition}
          />
        ))}
        <Button
          size="long"
          styleType="primary"
          onPress={handlePress}
          isDisabled={isDisabled}
        >
          <Text>JE CONFIRME MON RENDEZ-VOUS</Text>
        </Button>
      </View>
      <Spinner
        visible={loading}
        textContent={"Prise de rendez-vous en cours..."}
        textStyle={{ color: "#FFF" }}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
    </>
  );
}

function Condition({
  title,
  value,
  onCheckedChange,
}: {
  title: string;
  value: string | null | undefined;
  onCheckedChange: (title: string, isChecked: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckChange() {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange(title, newValue);
  }

  return (
    <View style={styles.conditionContainer}>
      <View>
        <Text style={styles.conditionTitle}>{title}</Text>
        <Text style={styles.conditionValue}>{value}</Text>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onTouchEnd={handleCheckChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center",
    gap: 10,
  },
  conditionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  conditionValue: {
    fontSize: 18,
  },
  checkbox: {
    alignSelf: "center",
    width: 25,
    height: 25,
  },
  conditionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.backgroundTertiary,
    width: "100%",
    borderRadius: 10,
    padding: 20,
    paddingRight: 50,
  },
});
