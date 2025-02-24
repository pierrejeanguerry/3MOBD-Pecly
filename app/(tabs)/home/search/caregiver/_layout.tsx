import { AppointmentProvider } from "@/contexts/appointmentContext";
import { CaregiverProvider } from "@/contexts/caregiverContext";
import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function CaregiverLayout() {
  return (
    <CaregiverProvider>
      <AppointmentProvider>
        <Stack
          screenOptions={{
            title: "",
            headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          }}
        >
          {/* <Stack.Screen name="[caregiver]" />
          <Stack.Screen name="appointment" />
          <Stack.Screen name="confirmed" />
          <Stack.Screen name="date" />
          <Stack.Screen name="error" />
          <Stack.Screen name="summary" /> */}
        </Stack>
      </AppointmentProvider>
    </CaregiverProvider>
  );
}
