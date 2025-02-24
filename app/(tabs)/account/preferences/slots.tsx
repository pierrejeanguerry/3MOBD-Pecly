import { theme } from "@/styles/theme";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { addDays, formatDate } from "date-fns";

export default function SlotsScreen() {
  const [isSelected, setIsSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const today = new Date();
  const week: string[] = [
    `${formatDate(today, "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 1), "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 2), "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 3), "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 4), "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 5), "dd/MM/yyyy")}`,
    `${formatDate(addDays(today, 6), "dd/MM/yyyy")}`,
  ];
  console.log(week);

  return (
    <View>
      <FlatList
        data={week}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <DayTab
            day={item}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            value={index}
          />
        )}
      />
    </View>
  );
}

function DayTab({
  day,
  isSelected,
  setIsSelected,
  value,
}: {
  day: string;
  isSelected: boolean[];
  setIsSelected: (update: (prev: boolean[]) => boolean[]) => void;
  value: number;
}) {
  function onPress() {
    setIsSelected((prev) => prev.map((_, i) => i === value));
  }

  return (
    <TouchableOpacity
      style={[styles.day, isSelected[value] && styles.selected]}
      onPress={onPress}
    >
      <Text>{day}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  day: {
    borderWidth: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  selected: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
});
