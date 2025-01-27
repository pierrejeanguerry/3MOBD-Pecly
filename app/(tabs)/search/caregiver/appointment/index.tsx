import MotivesPicker from "@/components/MotivesPicker";
import { AppointmentData, useAppointment } from "@/contexts/appointmentContext";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Appointment() {
  const { caregiverData } = useCaregiver();
  const { appointmentData, setAppointmentData } = useAppointment();
  const motives = caregiverData?.caregiverDetails.motives ?? [];
  const router = useRouter();
  useEffect(() => {
    if (caregiverData)
      setAppointmentData({ caregiverId: caregiverData.id } as AppointmentData);
  }, []);

  function onPress(item: string) {
    setAppointmentData({ motive: item } as AppointmentData);
    router.push("./appointment/date");
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: `Dr ${caregiverData?.name}`,
          headerStyle: { backgroundColor: "#34659A" },
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
              data={caregiverData?.caregiverDetails.motives}
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
    backgroundColor: "#DFF3FF",
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
