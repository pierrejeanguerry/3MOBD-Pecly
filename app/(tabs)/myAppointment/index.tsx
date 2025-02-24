import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import styles from "./styles";
import firestore, { arrayUnion } from "@react-native-firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

import Login from "../account/login";
import { formatCaregiver, formatName } from "@/utils/formatString";

export default function MyAppointmentScreen() {
  const [passed, setPassed] = useState(false);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  const handleSwitch = (isPassed: boolean) => {
    Animated.timing(underlinePosition, {
      toValue: isPassed ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setPassed(isPassed);
    }, 300);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Mes rendez-vous</Text>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleSwitch(false)}
        >
          <Text>A venir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleSwitch(true)}>
          <Text>Passées</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.underlineWrapper}>
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlinePosition.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "50%"],
              }),
            },
          ]}
        />
      </View>
      <NotPassedAppointment passed={passed} />
    </View>
  );
}

function NotPassedAppointment({ passed }: any) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Appointments")
      .where("patientId", "==", user?.id)
      .where("isPassed", "==", passed)
      .onSnapshot(async (querySnapshot) => {
        let tempAppointment: any[] = [];
        for (const element of querySnapshot.docs) {
          const data = element.data();
          const caregiverSnap = await firestore()
            .doc(`Users/${data.caregiverId}`)
            .get();
          const caregiver = caregiverSnap.data();
          tempAppointment.push({
            id: element.id,
            appointment: data,
            caregiver,
            idCaregiver: caregiverSnap.id,
          });
        }
        setAppointments(tempAppointment);
      });

    return () => unsubscribe();
  }, [passed, user?.id]);

  const handleCancel = async (
    id: string,
    idCaregiver: string,
    dateTime: any
  ) => {
    await firestore().collection("Appointments").doc(id).delete();

    const date = dateTime.toDate();
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    console.log(dateStr, timeStr);

    const availabilitySnapshot = await firestore()
      .collection(`Users/${idCaregiver}/Availabilities`)
      .where("date", "==", dateStr)
      .limit(1)
      .get();
    if (!availabilitySnapshot.empty) {
      const docRef = availabilitySnapshot.docs[0].ref;
      await docRef.update({
        slots: arrayUnion(timeStr),
      });
    } else {
      console.log("Aucune disponibilité trouvée pour cette date.");
    }
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <View style={unique.container}>
      <FlatList
        data={appointments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={unique.card}>
            <Text style={unique.motive}>Motif: {item.appointment.motive}</Text>
            <Text style={unique.caregiver}>
              Soignant:{" "}
              {formatCaregiver(
                `${item.caregiver.firstname} ${item.caregiver.lastname}`
              )}
            </Text>
            <Text style={unique.date}>
              Date: {formatDate(item.appointment.dateTime)}
            </Text>
            <Text style={unique.address}>
              {formatName(`${item.caregiver.address.street}`)}
              {"\n"}
              {formatName(`${item.caregiver.address.postalCode}`)}
              {", "}
              {formatName(`${item.caregiver.address.city}`)}

              {"\n"}
              {formatName(`${item.caregiver.address.country}`)}
              {"\n"}
            </Text>
            {!passed ? (
              <Button
                title={"Annuler"}
                onPress={() =>
                  handleCancel(
                    item.id,
                    item.idCaregiver,
                    item.appointment.dateTime
                  )
                }
              />
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const unique = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  motive: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  caregiver: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
