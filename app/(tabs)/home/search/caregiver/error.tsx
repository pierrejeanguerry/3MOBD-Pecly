import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import { useAppointment } from "@/contexts/appointmentContext";
import { theme } from "@/styles/theme";

export default function Error() {
  const router = useRouter();
  const { setAppointmentData, appointmentData } = useAppointment();
  function handlePress() {
    setAppointmentData({ ...appointmentData, dateTime: undefined });
    router.push("/(tabs)/home/search/caregiver/date");
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <FontAwesome name="window-close-o" size={100} color={"red"} />
        <Text style={styles.title}>ERREUR LORS DE LA PRISE DE RENDEZ-VOUS</Text>
        <Button size="large" styleType="primary" onPress={() => handlePress()}>
          <Text>Changer de plage horaire</Text>
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
    textAlign: "center",
  },
});
