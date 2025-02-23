import MotivesPicker from "@/components/MotivesPicker";
import { useAppointment } from "@/contexts/appointmentContext";
import { useCaregiver } from "@/contexts/caregiverContext";
import { theme } from "@/styles/theme";
import { AppointmentData } from "@/types/appointment";
import { formatCaregiver } from "@/utils/formatString";
import { Stack, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Appointment() {
  const { caregiverData } = useCaregiver();
  const { setAppointmentData } = useAppointment();
  const motives = caregiverData?.caregiverDetails?.motives ?? [];
  const router = useRouter();

  function onPress(item: string) {
    if (caregiverData)
      setAppointmentData({
        motive: item,
        caregiverId: caregiverData.id,
      } as AppointmentData);
    router.push("/(tabs)/home/search/caregiver/date", {
      relativeToDirectory: true,
    });
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: caregiverData?.name
            ? formatCaregiver(caregiverData?.name)
            : "",
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: "white",
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Selectionnez le motif de la consultation
          </Text>
          {motives.length !== 0 && (
            <FlatList
              data={caregiverData?.caregiverDetails?.motives}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => {
                let pos: "begin" | "middle" | "end" = "middle";
                if (index === 0) {
                  pos = "begin";
                } else if (index === motives.length - 1) {
                  pos = "end";
                }

                return (
                  <MotivesPicker
                    data={item}
                    pos={pos}
                    onPress={() => onPress(item)}
                  />
                );
              }}
            />
          )}
        </View>
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
  },
  separator: {
    height: 5,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
