import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { useAppointment } from "@/contexts/appointmentContext";
import { useCaregiver } from "@/contexts/caregiverContext";
import Checkbox from "expo-checkbox";
import Button from "@/components/Button";
import firestore from "@react-native-firebase/firestore";
import Login from "@/app/(tabs)/account/login";
import { DatabaseError, ERROR_MESSAGES } from "@/utils/errors";

export default function Summary() {
  const { user } = useAuth();
  const { appointmentData } = useAppointment();
  const { caregiverData } = useCaregiver();
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  // Liste des conditions disponibles (uniquement celles qui ont une valeur)
  const conditions = [
    {
      title: "Soignant",
      value: caregiverData?.name ? `Dr. ${caregiverData.name}` : null,
    },
    {
      title: "Date du rendez-vous",
      value: appointmentData?.dateTime
        ? format(appointmentData.dateTime.toDate(), "dd/MM/yyyy à HH:mm", {
            locale: fr,
          })
        : null,
    },
    { title: "Raison", value: appointmentData?.motive || null },
    {
      title: "Adresse",
      value: caregiverData?.address
        ? `${caregiverData.address.street}\n${caregiverData.address.postalCode}, ${caregiverData.address.city}`
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

      const oldAvailabilityRef = await firestore()
        .collection("Users")
        .doc(appointmentData.caregiverId)
        .collection("Availabilities")
        .where("date", "==", date.toISOString().split("T")[0])
        .get();

      if (!oldAvailabilityRef.empty) {
        await oldAvailabilityRef.docs[0].ref.update({
          slots: firestore.FieldValue.arrayRemove(slot),
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

      router.push("./summary/confirmed");
    } catch (e) {
      console.error("Erreur Firestore:", e);
      router.push("./summary/error");
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: ``,
          headerStyle: { backgroundColor: "#34659A" },
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
    </>
  );
}

function Condition({
  title,
  value,
  onCheckedChange,
}: {
  title: string;
  value: string | null;
  onCheckedChange: (title: string, isChecked: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckChange(newValue: boolean) {
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
        onValueChange={handleCheckChange}
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
    backgroundColor: "#DFF3FF",
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
  },
  conditionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    paddingRight: 50,
  },
});
