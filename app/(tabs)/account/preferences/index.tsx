import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Tab() {
  const router = useRouter();
  const { user } = useAuth();

  const options = [
    {
      label: "Modifier mon nom et prénom",
      path: "/(tabs)/account/preferences/name",
    },
    {
      label: "Modifier mon numéro de téléphone",
      path: "/(tabs)/account/preferences/phone",
    },
    { label: "Modifier mon genre", path: "/(tabs)/account/preferences/gender" },
  ] as const;

  const caregiverOptions = [
    {
      label: "Modifier mon adresse",
      path: "/(tabs)/account/preferences/address",
    },
    {
      label: "Instructions et motivations",
      path: "/(tabs)/account/preferences/instructions",
    },
    { label: "Présentation", path: "/(tabs)/account/preferences/presentation" },
    {
      label: "Moyens de paiement",
      path: "/(tabs)/account/preferences/payments",
    },
    { label: "Tarifs", path: "/(tabs)/account/preferences/pricing" },
    { label: "Créneaux horaires", path: "/(tabs)/account/preferences/slots" },
  ] as const;

  const handlePress = (
    path: ((typeof options)[number] | (typeof caregiverOptions)[number])["path"]
  ) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Mes préférences</Text>
      <FlatList
        data={user?.isCaregiver ? [...options, ...caregiverOptions] : options}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.privacyOption}
            onPress={() => handlePress(item.path)}
          >
            <Text style={styles.privacyOptionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFF3FF",
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#43193B",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  privacyOption: {
    backgroundColor: "#FFFFFF",
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
