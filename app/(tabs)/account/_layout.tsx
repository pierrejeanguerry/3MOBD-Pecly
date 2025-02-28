import { theme } from "@/styles/theme";
import { Stack } from "expo-router/stack";

export default function accountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "",
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
      }}
    />
  );
}
