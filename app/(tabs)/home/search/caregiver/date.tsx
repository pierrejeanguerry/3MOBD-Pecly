import AppointmentPicker from "@/components/AppointmentPicker";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack, useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { useAppointment } from "@/contexts/appointmentContext";
import { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import Button from "@/components/Button";
import { Timestamp } from "@react-native-firebase/firestore";
import { addHours, addMinutes } from "date-fns";
import { Availability } from "@/types/availability";
import { theme } from "@/styles/theme";
import Spinner from "react-native-loading-spinner-overlay";

export default function DateSelect() {
  const { caregiverData } = useCaregiver();
  const { setAppointmentData, appointmentData } = useAppointment();
  const [toogleModal, setToggleModal] = useState(false);
  const router = useRouter();
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caregiverData?.id) return;

    setLoading(true);
    setError(null);

    const today = new Date().toISOString().split("T")[0];

    const unsubscribe = firestore()
      .collection(`Users/${caregiverData?.id}/Availabilities`)
      .where("date", ">=", today)
      .orderBy("date", "asc")
      .onSnapshot(
        (snapshot) => {
          if (!snapshot.empty) {
            const formattedData: Availability[] = snapshot.docs
              .map((doc) => {
                const docData = doc.data() as Partial<Availability>;

                if (!docData.date || !docData.slots) return null;

                return {
                  slots: docData.slots.sort(),
                  date: format(new Date(docData.date), "dd/MM/yyyy"),
                  value: new Date(docData.date),
                };
              })
              .filter((data): data is Availability => data !== null);

            setAvailabilities(formattedData);
          } else {
            setAvailabilities([]);
          }
          setLoading(false);
        },
        (err) => {
          setError("Erreur lors de la récupération des disponibilités.");
          console.error(err);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [caregiverData?.id]);
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
    if (
      caregiverData?.caregiverDetails &&
      caregiverData?.caregiverDetails.mustBeReferred
    )
      setToggleModal((prev) => !prev);
    else router.push("/(tabs)/home/search/caregiver/summary");
  }

  function handlePressModal() {
    setToggleModal(false);
    router.push("/(tabs)/home/search/caregiver/summary");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Dr ${caregiverData?.name}`,
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
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
      <Spinner
        visible={loading}
        textContent={"Connexion..."}
        textStyle={{ color: "#FFF" }}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.backgroundSecondary,
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
