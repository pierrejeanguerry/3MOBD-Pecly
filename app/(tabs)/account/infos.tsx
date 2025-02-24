import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { theme } from "@/styles/theme";

function onPress(): void {}

export default function Infos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Informations légales</Text>

      <View style={styles.privacySection}>
        <TouchableOpacity style={styles.privacyOption}>
          <Text style={styles.privacyOptionText}>
            <Link href={"/(tabs)/account/cgu"}>
              Conditions générales d'utilisation
            </Link>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacyOption}>
          <Text style={styles.privacyOptionText}>
            <Link href={"/(tabs)/account/mentions"}>Mentions légales</Link>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#43193B",
  },
  privacySection: {
    marginTop: 30,
  },
  privacyOption: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  privacyOptionText: {
    fontSize: 16,
    color: "#333",
  },
});
