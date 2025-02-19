import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  search,
  setSearch,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} size={28} name="search" />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
        onSubmitEditing={onSubmit}
      />
      {search !== "" && (
        <TouchableOpacity onPress={() => setSearch("")}>
          <FontAwesome size={28} name="close" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    width: 362,
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundTertiary,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: 240,
    height: 29,
    fontSize: 24,
  },
});
