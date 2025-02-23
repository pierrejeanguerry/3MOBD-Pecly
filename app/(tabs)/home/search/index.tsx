import Searchbar from "@/components/SearchBar";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useDebounce } from "@/hooks/useDebounce";
import SpecialityLabel from "@/components/SpecialityLabel";
import { User } from "@/types/user";
import { theme } from "@/styles/theme";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [specialitiesList, setSpecialitiesList] = useState<string[]>([]);
  const [caregiversList, setCaregiversList] = useState<User[]>([]);

  const specialties = [
    "allergologue",
    "anesthesiste",
    "andrologue",
    "cardiologue",
    "chirurgien",
    "chirurgien cardiaque",
    "chirurgien esthetique",
    "chirurgien general",
    "chirurgien maxillo-facial",
    "chirurgien pediatrique",
    "chirurgien thoracique",
    "chirurgien vasculaire",
    "neurochirurgien",
    "dermatologue",
    "endocrinologue",
    "gastro-enterologue",
    "geriatre",
    "gynecologue",
    "hematologue",
    "hepatologue",
    "infectiologue",
    "medecin en medecine aiguë",
    "medecin du travail",
    "medecin generaliste",
    "medecin interniste",
    "medecin nucleaire",
    "medecin en soins palliatifs",
    "medecin en medecine physique",
    "medecin en medecine preventive",
    "neonatologue",
    "nephrologue",
    "neurologue",
    "odontologiste",
    "oncologue",
    "obstetricien",
    "ophtalmologue",
    "orthopediste",
    "oto-rhino-laryngologue",
    "pediatre",
    "pneumologue",
    "psychiatre",
    "radiologue",
    "radiotherapeute",
    "rhumatologue",
    "urologue",
  ];

  const getCargivers = async () => {
    if (!search) {
      setCaregiversList([]);
      setSpecialitiesList([]);
      return;
    }
    const slug = search.toLowerCase();
    try {
      const caregivers = await firestore()
        .collection("Users")
        .where("isCaregiver", "==", true)
        .where("lastname", ">=", slug)
        .where("lastname", "<=", slug + "\uf8ff")
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
      setSpecialitiesList(
        specialties.filter((speciality) =>
          speciality.toLowerCase().includes(slug)
        )
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
        <Text style={styles.title}>Nom, specialite, etablissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} onSubmit={onSubmit} />
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
