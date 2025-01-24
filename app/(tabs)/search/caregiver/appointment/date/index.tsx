import DatePicker from "@/components/DatePicker";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Date() {
  const { caregiverData } = useCaregiver();

  const dates = [];
  return (
    <View>
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
          {dates.length !== 0 && (
            <FlatList
              data={caregiverData?.caregiverDetails.motives}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => <DatePicker />}
            />
          )}
        </View>
      </View>
    </View>
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
