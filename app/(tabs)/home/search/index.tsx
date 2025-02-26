import Searchbar from "@/components/SearchBar";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useEffect, useState } from "react";
import firestore, { limit } from "@react-native-firebase/firestore";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useDebounce } from "@/hooks/useDebounce";
import SpecialityLabel from "@/components/SpecialityLabel";
import { User } from "@/types/user";
import { theme } from "@/styles/theme";

import specialties from './specialties.json';

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [specialitiesList, setSpecialitiesList] = useState<string[]>([]);
  const [caregiversList, setCaregiversList] = useState<User[]>([]);

  const getCargivers = async () => {
    if (!search) {
      setCaregiversList([]);
      setSpecialitiesList([]);
      return;
    }
    const slug = search.toLowerCase();
    try {
      if (slug.length > 2) {
        const caregivers = await firestore()
          .collection("Users")
          .where("isCaregiver", "==", true)
          .where("lastname", ">=", slug)
          .where("lastname", "<=", slug + "\uf8ff")
          .limit(10)
          .get();
        const datas = caregivers.docs.map((doc) => {
          const docData = doc.data() as User;
          return {
            ...docData,
            id: doc.ref.id,
            name: `${docData.firstname} ${docData.lastname}`,
          };
        });
        setCaregiversList(datas);
      } else setCaregiversList([]);
      setSpecialitiesList(
        specialties
          .filter((speciality) => speciality.toLowerCase().includes(slug))
          .slice(0, 8)
      );
    } catch (e) {
      console.error(e);
    }
  };
  const debouncedCaregivers = useDebounce(getCargivers, 500);

  useEffect(() => {
    debouncedCaregivers();
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
<<<<<<< Updated upstream
        <Text style={styles.title}>Nom, specialite, etablissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} onSubmit={onSubmit} />
=======
        <Text style={styles.title}>Nom, spécialité, établissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} />
>>>>>>> Stashed changes
        {specialitiesList.length != 0 && (
          <FlatList
            style={styles.containerItem}
            data={specialitiesList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <SpecialityLabel name={item} emphasis={search} />
            )}
          />
        )}
        {caregiversList.length != 0 && (
          <FlatList
            data={caregiversList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <SpecialistLabel item={item} type="summarized" />
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
    backgroundColor: theme.colors.backgroundSecondary,
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
