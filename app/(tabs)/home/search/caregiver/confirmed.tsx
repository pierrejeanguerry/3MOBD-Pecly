import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import { useAppointment } from "@/contexts/appointmentContext";
import { theme } from "@/styles/theme";

export default function confirmed() {
  const router = useRouter();
  const { clearAppointmentData } = useAppointment();
  function handlePress() {
    clearAppointmentData();
    router.push("/(tabs)/home/search");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <FontAwesome name="check-circle-o" size={100} color={"green"} />
        <Text style={styles.title}>RENDEZ-VOUS CONFIRME</Text>
        <Button size="large" styleType="primary" onPress={() => handlePress()}>
          <Text>Nouvelle recherche</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
