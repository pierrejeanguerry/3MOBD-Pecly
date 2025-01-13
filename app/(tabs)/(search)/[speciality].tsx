import Searchbar from "@/components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LocationScreen() {
  const [search, setSearch] = useState("");
  const { speciality } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View>
        <Text>{speciality}</Text>
        <Text style={styles.title}>Où ? (adresse, ville, ...)</Text>
        <Searchbar search={search} setSearch={setSearch} />
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
