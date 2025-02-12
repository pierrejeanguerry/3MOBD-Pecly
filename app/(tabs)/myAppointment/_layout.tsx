import { AuthProvider } from "@/hooks/useAuth";
import { Stack } from "expo-router/stack";

export default function myAppointmentLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}></Stack>
    );
}