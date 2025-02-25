import { AuthProvider } from "@/hooks/useAuth";
import { Stack } from "expo-router/stack";
import { KeyboardProvider } from "react-native-keyboard-controller";


export default function Layout() {
    console.warn = (error:any) => error.apply;
    return (
    <AuthProvider>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </KeyboardProvider>
    </AuthProvider>
  );
}
