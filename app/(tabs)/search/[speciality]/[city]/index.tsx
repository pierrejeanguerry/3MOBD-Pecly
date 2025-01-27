import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import SpecialistLabel from "@/components/SpecialistLabel";

export default function LocationScreen() {
  const { speciality, city } = useLocalSearchParams();
  const [caregiversList, setCaregiversList] = useState<Specialist[]>([]);
  type Specialist = {
    id: string;
    name: string;
    caregiverDetails: {
      speciality: string;
    };
    address: {
      city: string;
      street: string;
      postalCode: string;
      country: string;
    };
    icon: string;
  };
  const getCargivers = async () => {
    try {
      const cityLowerCase = Array.isArray(city)
        ? city[0].toLowerCase()
        : city.toLowerCase();
      const specialityLowerCase = Array.isArray(speciality)
        ? speciality[0].toLowerCase()
        : speciality.toLowerCase();
      const data = await firestore()
        .collection("Users")
        .where("role", "==", "caregiver")
        .where("address.city", "==", cityLowerCase)
        .where("caregiverDetails.speciality", "==", specialityLowerCase)
        .get();
      console.log(data.docs);

      const caregivers = data.docs.map((doc) => {
        const docData = doc.data() as Specialist;
        return {
          ...docData,
          id: doc.ref.id,
        };
      });

      setCaregiversList(caregivers);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCargivers();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={caregiversList}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <SpecialistLabel item={item} type="detailled" />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 100 : 20,
    backgroundColor: "#DFF3FF",
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
});
