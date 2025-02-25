import { theme } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  pageContainer: {
    height: "100%",
    width: "100%",
  },
  headerTitle: {
    height: Platform.OS === "ios" ? 100 : 50,
    backgroundColor: theme.colors.backgroundPrimary,
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
  },
  headerTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tab: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 10,
  },
  underlineWrapper: {
    width: "100%",
    position: "relative",
    height: 3,
    marginTop: -3,
  },
  underline: {
    position: "absolute",
    width: "50%",
    height: 2,
    backgroundColor: theme.colors.backgroundPrimary,
  },
});
