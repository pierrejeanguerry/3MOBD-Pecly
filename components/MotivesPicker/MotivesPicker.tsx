import { theme } from "@/styles/theme";
import { formatMotive } from "@/utils/formatString";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

type PickerPos = "begin" | "middle" | "end";

export default function MotivesPicker({
  data,
  pos,
  onPress,
}: {
  data: string;
  pos: PickerPos;
  onPress: () => void;
}) {
  const getContainerStyle = () => {
    if (pos === "begin") return styles.containerBegin;
    if (pos === "end") return styles.containerEnd;
    return styles.containerMiddle;
  };

  return (
    <TouchableOpacity style={getContainerStyle()} onPress={onPress}>
      <Text>{formatMotive(data)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerBegin: {
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: theme.colors.backgroundTertiary,
    height: 50,
    width: 350,
  },
  containerMiddle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.backgroundTertiary,
    height: 50,
    width: 350,
  },
  containerEnd: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.backgroundTertiary,
    height: 50,
    width: 350,
  },
});
