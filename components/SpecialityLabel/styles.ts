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
    color: "black",
    fontSize: 16,
  },
  emphasis: {
    color: "#4B94D8",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "#4B94D8",
    textDecorationStyle: "solid",
  },
});

export default styles;
