import { AppointmentProvider } from "@/contexts/appointmentContext";
import { CaregiverProvider } from "@/contexts/caregiverContext";
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
              headerStyle: { backgroundColor: "#34659A" },
            }}
          />
        </Stack>
      </AppointmentProvider>
    </CaregiverProvider>
  );
}
