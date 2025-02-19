import { AppointmentProvider } from "@/contexts/appointmentContext";
import { CaregiverProvider } from "@/contexts/caregiverContext";
import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function CaregiverLayout() {
  return (
    <CaregiverProvider>
      <AppointmentProvider>
        <Stack>
          <Stack.Screen
            name="[caregiver]"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
          <Stack.Screen
            name="appointment"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
          <Stack.Screen
            name="confirmed"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
          <Stack.Screen
            name="date"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
          <Stack.Screen
            name="error"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
          <Stack.Screen
            name="summary"
            options={{
              title: "",
              headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
            }}
          />
        </Stack>
      </AppointmentProvider>
    </CaregiverProvider>
  );
}
