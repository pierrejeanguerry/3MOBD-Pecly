import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/styles/theme";


export default function Infos() {

  const router = useRouter();


  const handlePressCgu = () => {
    router.push("/(tabs)/account/cgu");
  };

  const handlePressMentions = () => {
    router.push("/(tabs)/account/mentions");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Informations légales</Text>

      <View style={styles.privacySection}>
        <TouchableOpacity style={styles.privacyOption} onPress={handlePressCgu}>
          <Text style={styles.privacyOptionText}>
              Conditions générales d'utilisation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacyOption} onPress={handlePressMentions}>
          <Text style={styles.privacyOptionText}>
            Mentions légales
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
