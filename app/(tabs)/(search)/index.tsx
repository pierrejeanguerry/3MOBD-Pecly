import Searchbar from "@/components/SearchBar";
import SpecialistLabel from "@/components/SpecialistLabel";
import SpecialityLabel from "@/components/SpecialityLabel";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const specialityList = [
    "Medecin Generaliste",
    "Chirurgien",
    "Veterinaire",
    "Podologue",
  ];

  const specialistList = [
    {
      name: "Charles Dupont",
      city: "Clermont-Ferrand",
      icon: "",
      speciality: "Chirurgien",
    },
    {
      name: "Alex Louis",
      city: "Villeurbanne",
      icon: "",
      speciality: "Generaliste",
    },
    {
      name: "Jeannette Clarisse",
      city: "Lyon",
      icon: "",
      speciality: "Pedopsychiatre",
    },
  ];
  useEffect(() => {
    //requete à l'API avec la recherche
    // res donne specialityList et specialistList
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nom, spécialité, établissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} />
        <FlatList
          style={styles.specialityContainer}
          data={specialityList}
          renderItem={({ item }) => (
            <SpecialityLabel name={item} emphasis={search} />
          )}
        />
        <FlatList
          style={styles.specialistContainer}
          data={specialistList}
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
  },
  specialityContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  specialistContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  title: {
    fontWeight: "800",
  },
});
