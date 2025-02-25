import { AppointmentProvider } from "@/contexts/appointmentContext";
import { CaregiverProvider } from "@/contexts/caregiverContext";
import { theme } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { Button, TouchableOpacity } from "react-native";

export default function CaregiverLayout() {
  const router = useRouter();
  return (
    <CaregiverProvider>
      <AppointmentProvider>
        <Stack
          screenOptions={{
            title: "",
            headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          }}
        >
          <Stack.Screen
            name="[caregiver]"
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <FontAwesome name="arrow-left" size={20} color={"white"} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="appointment" />
          <Stack.Screen name="confirmed" />
          <Stack.Screen name="date" />
          <Stack.Screen name="error" />
          <Stack.Screen name="summary" />
        </Stack>
      </AppointmentProvider>
    </CaregiverProvider>
  );
}
