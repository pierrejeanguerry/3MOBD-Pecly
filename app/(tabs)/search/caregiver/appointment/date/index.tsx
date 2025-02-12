import AppointmentPicker from "@/components/AppointmentPicker";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack, useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAvailabilities } from "@/hooks/useAvailabilities";
import { useAuth } from "@/hooks/useAuth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { addHours, addMinutes, min } from "date-fns";
import { useAppointment } from "@/contexts/appointmentContext";

export default function DateSelect() {
  const { user } = useAuth();
  const { caregiverData } = useCaregiver();
  const { availabilities } = useAvailabilities(caregiverData?.id);
  const { appointmentData } = useAppointment();

  // async function onPress(date: Date, slot: string) {
  //   if (!user || !appointmentData)
  //     throw new Error("User not logged in, or data problemes");

  //   const [hours, minutes] = slot.split(":").map(Number);
  //   const dateTime = new Timestamp(
  //     Math.floor(addMinutes(addHours(date, hours), minutes).getTime() / 1000),
  //     (date.getTime() % 1000) * 1_000_000
  //   );

  //   try {
  //     const isAlreadyReserved = await firestore()
  //       .collection("Appointments")
  //       .where("caregiverId", "==", caregiverData?.id)
  //       .where("dateTime", "==", dateTime)
  //       .get();

  //     if (!isAlreadyReserved.empty) throw new Error("Slot isn't available");

  //     await firestore().collection("Appointments").add({
  //       caregiverId: appointmentData.caregiverId,
  //       dateTime,
  //       motive: appointmentData.motive,
  //       patientId: user.id,
  //       status: "pending",
  //     });

  //     const oldAvailabilityRef = await firestore()
  //       .collection("Users")
  //       .doc(appointmentData.caregiverId)
  //       .collection("Availabilities")
  //       .where("date", "==", date.toISOString().split("T")[0])
  //       .get();

  //     if (!oldAvailabilityRef.empty) {
  //       await oldAvailabilityRef.docs[0].ref.update({
  //         slots: firestore.FieldValue.arrayRemove(slot),
  //       });
  //     }
  //   } catch (e) {
  //     console.error("Erreur Firestore:", e);
  //   }
  // }

  function onPress() {}

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
