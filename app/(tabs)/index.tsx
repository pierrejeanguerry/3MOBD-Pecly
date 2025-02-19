import { theme } from "@/styles/theme";
import { Redirect } from "expo-router";
import { StatusBar } from "react-native";

export default function Index() {
  return (
    <>
      <StatusBar backgroundColor={theme.colors.backgroundPrimary} />
      <Redirect href="/home" />
    </>
  );
}
