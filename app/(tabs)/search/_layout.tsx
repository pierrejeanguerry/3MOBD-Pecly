import { Slot, Stack } from "expo-router";
import { StyleSheet, View, Platform } from "react-native";

export default function SearchLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
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
