import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { getTodayTimestamp } from "@/utils/manageTimestamp";

export default function SlotsScreen() {
  const { user } = useAuth();
  const [numSlotColumns, _] = useState(2);
  const [isDaySelected, setIsDaySelected] = useState<boolean[]>([
    true,
    ...Array(6).fill(false),
  ]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [isHourSelected, setIsHourSelected] = useState<boolean[][]>(
    isDaySelected.map(() => Array(48).fill(false))
  );

  const today = getTodayTimestamp();
  const week: string[] = Array.from({ length: 7 }, (_, i) =>
    format(addDays(new Date(), i), "EE dd/MM/yyyy", { locale: fr })
  );

  const hours = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  useEffect(() => {
    fetchDatas();
  }, []);
  async function fetchDatas() {
    const availabilitiesRef = await firestore()
      .collection(`Users/${user?.id}/Availabilities`)
      .where("date", ">=", today)
      .where("date", "<=", addDays(today.toDate(), 6))
      .get();

    if (!availabilitiesRef.empty) {
      const updatedIsHourSelected = [...isHourSelected];

      availabilitiesRef.docs.forEach((doc) => {
        const data = doc.data();
        const docDateTs: Timestamp = data.date;
        const docTime = data.slots;

        const docDate = docDateTs.toDate();
        const dayIndex =
          docDate.getDate() -
          today.toDate().getDate() +
          7 * (docDate.getMonth() - today.toDate().getMonth());
        docTime.forEach((element: string) => {
          const hourIndex = getHourIndex(element);
          if (dayIndex >= 0 && dayIndex < 7 && hourIndex !== -1) {
            updatedIsHourSelected[dayIndex][hourIndex] = true;
          }
        });
      });

      setIsHourSelected(updatedIsHourSelected);
    }
  }
  function getHourIndex(time: string): number {
    const hours = Array.from({ length: 48 }, (_, i) => {
      const hours = Math.floor(i / 2)
        .toString()
        .padStart(2, "0");
      const minutes = i % 2 === 0 ? "00" : "30";
      return `${hours}:${minutes}`;
    });

    return hours.indexOf(time);
  }

  async function onSubmit() {
    for (const [dayIndex] of isDaySelected.entries()) {
      let list: string[] = [];
      for (const [slotIndex, isSlots] of isHourSelected[dayIndex].entries()) {
        if (!isSlots) continue;
        list = [...list, hours[slotIndex]];
      }

      const availabilitiesRef = firestore()
        .collection(`Users/${user?.id}/Availabilities`)
        .where(
          "date",
          "==",
          Timestamp.fromDate(addDays(today.toDate(), dayIndex))
        );
      let snapshot = await availabilitiesRef.get();
      if (!snapshot.empty) {
        snapshot.docs[0].ref.update({
          slots: list,
          slotsCount: list.length,
        });
      } else {
        firestore()
          .collection(`Users/${user?.id}/Availabilities`)
          .add({
            date: Timestamp.fromDate(addDays(today.toDate(), dayIndex)),
            slots: list,
            slotsCount: list.length,
          });
      }
    }
    setSuccessMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setSuccessMessage(false);
      fadeAnim.setValue(0);
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <FlatList
          horizontal={true}
          keyExtractor={(_, index) => index.toString()}
          data={week}
          renderItem={({ item, index }: { item: string; index: number }) => (
            <DayTab
              day={item}
              isSelected={isDaySelected}
              setIsSelected={setIsDaySelected}
              value={index}
            />
          )}
        />
      </View>
      <View style={styles.slotContainer}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={hours}
          numColumns={numSlotColumns}
          key={numSlotColumns}
          renderItem={({ item, index }: { item: string; index: number }) => (
            <Slot
              hour={item}
              value={index}
              setIsSelected={setIsHourSelected}
              isSelected={isHourSelected}
              dayIndex={isDaySelected.findIndex((day) => day)}
            />
          )}
        />
      </View>
      <View style={styles.submitContainer}>
        <Button onPress={onSubmit} size="large" styleType="empty">
          <Text>Submit</Text>
        </Button>
      </View>
      {successMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>Creneaux enregistrés !</Text>
        </Animated.View>
      )}
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

function Slot({
  hour,
  setIsSelected,
  value,
  isSelected,
  dayIndex,
}: {
  hour: string;
  setIsSelected: (update: (prev: boolean[][]) => boolean[][]) => void;
  value: number;
  isSelected: boolean[][];
  dayIndex: number;
}) {
  function onPress() {
    setIsSelected((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? day.map((item, i) => (i === value ? !item : item))
          : day
      )
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.slot, isSelected[dayIndex][value] && styles.selected]}
    >
      <Text>{hour}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  day: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 20,
  },
  selected: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  dayContainer: {
    marginBottom: 10,
  },
  slotContainer: {
    flex: 1,
  },
  slot: {
    borderColor: "black",
    borderWidth: 0.25,
    borderRadius: 10,
    width: "47.5%",
    margin: 4,
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 10,
  },
  submitContainer: {
    alignSelf: "center",
    marginVertical: 10,
  },
  successMessage: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
