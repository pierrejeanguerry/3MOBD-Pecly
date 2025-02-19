import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  normal: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  emphasis: {
    color: theme.colors.textEmphasis,
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: theme.colors.textEmphasis,
    textDecorationStyle: "solid",
  },
});

export default styles;
