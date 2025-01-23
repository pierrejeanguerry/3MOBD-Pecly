import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function CaregiverScreen() {
  const { caregiver } = useLocalSearchParams();
  return <Text>{caregiver}</Text>;
}
