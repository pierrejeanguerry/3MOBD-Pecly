import Searchbar from "@/components/SearchBar";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
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

  const getCargivers = async () => {
    if (!search) {
      setCaregiversList([]);
      setSpecialitiesList([]);
      return;
    }
    const slug = search.toLowerCase();
    try {
      const [caregivers, specialities] = await Promise.all([
        firestore()
          .collection("Caregivers")
          .where("lastname", ">=", slug)
          .where("lastname", "<=", slug + "\uf8ff")
          .get(),
        firestore()
          .collection("Specialities")
          .where("speciality", ">=", slug)
          .where("speciality", "<=", slug + "\uf8ff")
          .get(),
      ]);

      setCaregiversList(caregivers.docs.map((doc) => doc.data() as Specialist));
      setSpecialitiesList(
        specialities.docs.map((doc) => doc.data() as Speciality)
      );
    } catch (e) {
      console.error(e);
    }
  };
  const debouncedCaregivers = useDebounce(getCargivers, 500);

  useEffect(() => {
    debouncedCaregivers();
  }, [search]);

  function onSubmit() {}

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nom, spécialité, établissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} onSubmit={onSubmit} />
        {specialitiesList.length != 0 && (
          <FlatList
            style={styles.containerItem}
            data={specialitiesList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <SpecialityLabel name={item.speciality} emphasis={search} />
            )}
          />
        )}
        {caregiversList.length != 0 && (
          <FlatList
            style={styles.containerItem}
            data={caregiversList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingTop: Platform.OS === "ios" ? 100 : 20,
    backgroundColor: "#DFF3FF",
  },

  containerItem: {
    marginTop: 10,
    flexGrow: 0,
  },
  title: {
    fontWeight: "800",
  },
  separator: {
    height: 15,
    backgroundColor: "transparent",
  },
});
