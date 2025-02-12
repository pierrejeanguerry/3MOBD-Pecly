import AppointmentPicker from "@/components/AppointmentPicker";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack, useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAvailabilities } from "@/hooks/useAvailabilities";

import { useAppointment } from "@/contexts/appointmentContext";
import { useState } from "react";
import CustomModal from "@/components/CustomModal";
import Button from "@/components/Button";
import { Timestamp } from "@react-native-firebase/firestore";
import { addHours, addMinutes } from "date-fns";

export default function DateSelect() {
  const { caregiverData } = useCaregiver();
  const { availabilities } = useAvailabilities(caregiverData?.id);
  const { setAppointmentData, appointmentData } = useAppointment();
  const [toogleModal, setToggleModal] = useState(false);
  const router = useRouter();

  function calculateTimeStamp(date: Date, slot: string) {
    const [hours, minutes] = slot.split(":").map(Number);
    const dateTime = new Timestamp(
      Math.floor(
        addMinutes(addHours(date, hours - 2), minutes).getTime() / 1000
      ),
      (date.getTime() % 1000) * 1_000_000
    );
    setAppointmentData({ ...appointmentData, dateTime: dateTime });
  }

  function onPress(date: Date, slot: string) {
    calculateTimeStamp(date, slot);
    if (caregiverData && caregiverData?.caregiverDetails.mustBeReferred)
      setToggleModal((prev) => !prev);
    else router.push("./date/summary");
  }

  function handlePressModal() {
    setToggleModal(false);
    router.push("./date/summary");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Dr ${caregiverData?.name}`,
          headerStyle: { backgroundColor: "#34659A" },
          headerTintColor: "white",
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Selectionnez la date de consultation</Text>
          {availabilities.length > 0 && (
            <FlatList
              data={availabilities}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <AppointmentPicker data={item} onPress={onPress} />
              )}
            />
          )}
        </View>
      </View>
      <CustomModal
        visible={toogleModal}
        onClose={() => setToggleModal(false)}
        size="small"
        title="A lire avant de prendre rendez-vous"
      >
        <View style={styles.modalContent}>
          <Text style={styles.textModal}>
            Afin de prendre ce rendez-vous, vous devez être adressé(e) par votre
            medecin traitant ou spécialiste. Veuuillez partager la lettre de
            d’adressage via Doctolib en amont de votre consultation pour ne plus
            avoir à y penser (ou l’apporter le jour de votre consultation).
          </Text>
          <Button size="long" styleType="primary" onPress={handlePressModal}>
            <Text>J'AI LU ET J'ACCEPTE LA CONSIGNE</Text>
          </Button>
        </View>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DFF3FF",
    alignItems: "center",
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  textModal: {
    fontSize: 18,
  },
  modalContent: {
    alignItems: "center",
    gap: 20,
  },
});
