import DatePicker from "@/components/DatePicker";
import { useCaregiver } from "@/contexts/caregiverContext";
import { Stack } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Availability, useAvailabilities } from "@/hooks/useAvailabilities";
import { useEffect } from "react";

export default function DateSelect() {
  const { caregiverData } = useCaregiver();
  const { availabilities } = useAvailabilities(caregiverData?.id);

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
          <Text style={styles.title}>Selectionnez la date de consultation</Text>
          {availabilities.length > 0 && (
            <FlatList
              data={availabilities}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => <DatePicker data={item} />}
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
    height: 10,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
