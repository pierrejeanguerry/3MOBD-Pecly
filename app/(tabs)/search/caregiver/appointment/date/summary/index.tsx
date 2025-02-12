import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { addHours, addMinutes, min } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useAppointment } from "@/contexts/appointmentContext";

export default function Summary() {
  const { user } = useAuth();
  const { appointmentData } = useAppointment();

  // async function onPress(date: Date, slot: string) {
  //   if (!user || !appointmentData)
  //     throw new Error("User not logged in, or data problemes");

  //   try {
  //     const isAlreadyReserved = await firestore()
  //       .collection("Appointments")
  //       .where("caregiverId", "==", caregiverData?.id)
  //       .where("dateTime", "==", appointmentData.dateTime)
  //       .get();

  //     if (!isAlreadyReserved.empty) throw new Error("Slot isn't available");

  //     await firestore().collection("Appointments").add({
  //       caregiverId: appointmentData.caregiverId,
  //       dateTime: appointmentData.dateTime,
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

  return (
    <>
      <Stack.Screen
        options={{
          title: ``,
          headerStyle: { backgroundColor: "#34659A" },
          headerTintColor: "white",
        }}
      />
      <View>
        <Text>Summary</Text>
      </View>
    </>
  );
}
