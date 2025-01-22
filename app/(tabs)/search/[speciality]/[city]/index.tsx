import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import SpecialistLabel from "@/components/SpecialistLabel";

export default function LocationScreen() {
  const { speciality, city } = useLocalSearchParams();
  const [caregiversList, setCaregiversList] = useState<Specialist[]>([]);
  type Specialist = {
    name: string;
    speciality: string;
    city: string;
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
        .collection("Caregivers")
        .where("city", "==", cityLowerCase)
        .where("speciality", "==", specialityLowerCase)
        .get();
      setCaregiversList(data.docs.map((doc) => doc.data() as Specialist));
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
          renderItem={({ item }) => (
            <SpecialistLabel
              name={item.name}
              city={item.city}
              icon={item.icon}
              speciality={item.speciality}
            />
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
});
