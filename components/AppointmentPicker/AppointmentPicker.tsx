import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Availability } from "@/types/availability";

export default function AppointmentPicker({
  data,
  onPress,
}: {
  data: Availability;
  onPress: (date: Date, slot: string) => void;
}) {
  const [toggle, setToggle] = useState<Boolean>(false);

  return (
    <View style={styles.container}>
      {!toggle && (
        <TouchableOpacity
          style={styles.top}
          onPress={() => setToggle((prev) => !prev)}
        >
          <>
            <Text style={styles.textTop}>{data.date}</Text>
            <FontAwesome name="sort-down" size={20} />
          </>
        </TouchableOpacity>
      )}
      {toggle && (
        <>
          <TouchableOpacity
            style={styles.topToggled}
            onPress={() => setToggle((prev) => !prev)}
          >
            <>
              <Text style={styles.textTop}>{data.date}</Text>
              <FontAwesome name="sort-up" size={20} />
            </>
          </TouchableOpacity>
          <View style={styles.bottom}>
            {data.slots.map((slot, index) => (
              <TouchableOpacity
                style={styles.label}
                onPress={() => onPress(data.value, slot)}
                key={index}
              >
                <Text style={styles.labelText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      <View></View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    height: 50,
    width: 350,
    paddingHorizontal: 20,
  },
  topToggled: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
    height: 50,
    width: 350,
    paddingHorizontal: 20,
    marginBottom: 2,
  },
  textTop: {
    fontSize: 16,
  },
  bottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: 350,

    backgroundColor: "white",
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    backgroundColor: "#A4CDE7",
    padding: 8,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 16,
  },
});
