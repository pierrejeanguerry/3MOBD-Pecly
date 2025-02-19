import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function SpecialityLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
        }}
      />
      <Stack.Screen
        name="[city]"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
        }}
      />
    </Stack>
  );
}
