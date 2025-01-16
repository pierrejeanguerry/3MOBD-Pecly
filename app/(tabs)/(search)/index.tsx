import Searchbar from "@/components/SearchBar";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDebounce } from "@/hooks/useDebounce";
import SpecialityLabel from "@/components/SpecialityLabel";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [specialitiesList, setSpecialitiesList] = useState<Speciality[]>([]);
  const [caregiversList, setCaregiversList] = useState<Specialist[]>([]);

  type Speciality = { speciality: string };
  type Specialist = {
    name: string;
    speciality: string;
    city: string;
    icon: string;
  };

  async function getCargivers() {
    let slug = search.toLowerCase();
    if (!search) {
      setCaregiversList([]);
      setSpecialitiesList([]);
      return;
    }
    try {
      const caregivers = await firestore()
        .collection("Caregivers")
        .where("lastname", ">=", slug)
        .where("lastname", "<=", slug + "\uf8ff")
        .get();

      const specialities = await firestore()
        .collection("Specialities")
        .where("speciality", ">=", slug)
        .where("speciality", "<=", slug + "\uf8ff")
        .get();

      const caregiversData = caregivers.docs.map(
        (doc) => doc.data() as Specialist
      );
      setCaregiversList(caregiversData);

      const specialitiesData = specialities.docs.map(
        (doc) => doc.data() as Speciality
      );
      setSpecialitiesList(specialitiesData);
    } catch (e) {
      console.error(e);
    }
  }
  const debouncedCaregivers = useDebounce(getCargivers, 500);

  useEffect(() => {
    debouncedCaregivers();
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nom, spécialité, établissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} />
        {specialitiesList && (
          <FlatList
            style={styles.specialityContainer}
            data={specialitiesList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <SpecialityLabel name={item.speciality} emphasis={search} />
            )}
          />
        )}
        {caregiversList && (
          <FlatList
            style={styles.caregiversContainer}
            data={caregiversList}
            renderItem={({ item }) => (
              <SpecialistLabel
                name={item.name}
                city={item.city}
                icon={item.icon}
                speciality={item.speciality}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
  },
  specialityContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  caregiversContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  title: {
    fontWeight: "800",
  },
});
