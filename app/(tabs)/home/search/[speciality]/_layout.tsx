import { Stack } from "expo-router";

export default function SpecialityLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#34659A" },
        }}
      />
      <Stack.Screen
        name="[city]"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#34659A" },
        }}
      />
    </Stack>
  );
}
