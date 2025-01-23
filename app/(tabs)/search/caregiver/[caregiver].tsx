import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import { useCaregiver } from "@/hooks/useCaregiver";

export default function CaregiverScreen() {
  const { caregiver } = useLocalSearchParams();
  const caregiverId = Array.isArray(caregiver) ? caregiver[0] : caregiver;
  const { data: caregiverData, loading, error } = useCaregiver(caregiverId);
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  if (!caregiverData) {
    return (
      <View style={styles.container}>
        <Text>Aucune donnée à afficher.</Text>
      </View>
    );
  }

  function onPress() {
    router.push(`./appointment`);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {caregiverData.icon ? (
          <Image source={{ uri: caregiverData.icon }} style={styles.icon} />
        ) : (
          <FontAwesome size={100} name="user" style={styles.icon} />
        )}
        <Text style={styles.textHeader}>Dr. {caregiverData.name}</Text>
        <Text style={styles.textHeader}>
          {caregiverData.caregiverDetails.speciality}
        </Text>
        <View style={styles.button}>
          <Button size="long" styleType="primary" onPress={onPress}>
            <FontAwesome name="calendar" size={18} />
            <Text> PRENDRE RENDEZ-VOUS</Text>
          </Button>
        </View>
      </View>
      <View style={styles.body}>
        {caregiverData.address && (
          <View style={styles.block}>
            <Text style={styles.title}>
              <FontAwesome name="address-book" size={18} /> ADRESSE
            </Text>
            <Text style={styles.text}>{caregiverData.address.street},</Text>
            <Text style={styles.text}>
              {caregiverData.address.postalCode} {caregiverData.address.city}
            </Text>
          </View>
        )}

        {caregiverData.caregiverDetails.presentation && (
          <View style={styles.block}>
            <Text style={styles.title}>
              <FontAwesome name="user-md" size={18} /> PRESENTATION
            </Text>
            <Text style={styles.text}>
              {caregiverData.caregiverDetails.presentation}
            </Text>
          </View>
        )}
        {caregiverData.contact && (
          <View style={styles.block}>
            <Text style={styles.title}>
              <FontAwesome name="user-md" size={18} /> CONTACTE
            </Text>
            {caregiverData.contact.email && (
              <Text style={styles.text}>
                email: {caregiverData.contact.email}
              </Text>
            )}
            {caregiverData.contact.phone && (
              <Text style={styles.text}>
                telephone: {caregiverData.contact.phone}
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#34659A",
    height: 250,
    zIndex: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#DFF3FF",
    padding: 10,
  },
  icon: {
    borderColor: "white",
    backgroundColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 100,
    width: 100,
  },
  textHeader: {
    fontSize: 16,
    color: "white",
  },
  text: {
    fontSize: 16,
  },
  button: {
    bottom: -20,
  },
  block: {
    marginTop: 20,
    padding: 20,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "white",
  },
});
