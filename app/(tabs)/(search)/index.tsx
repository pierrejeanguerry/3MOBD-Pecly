import Searchbar from "@/components/SearchBar";
import SpecialityLabel from "@/components/SpecialityLabel";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const list = [
    "Medecin Generaliste",
    "Chirurgien",
    "Veterinaire",
    "Podologue",
  ];
  useEffect(() => {
    //requete à l'API avec la recherche
    // res donne list
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nom, spécialité, établissement, ... </Text>
        <Searchbar search={search} setSearch={setSearch} />
        {list.map((elem) => (
          <SpecialityLabel name={elem} emphasis={search} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
  },
});
