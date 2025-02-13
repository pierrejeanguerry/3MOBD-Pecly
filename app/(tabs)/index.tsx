import Button from "@/components/Button";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useAuth } from "@/hooks/useAuth";
import { useHistory } from "@/hooks/useHistory";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Tab() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Informations />
      <MyCaregivers />
      <Footer />
    </ScrollView>
  );
}

function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>PECLY</Text>
      <Text style={styles.catchPhrase1}>La santé</Text>
      <Text style={styles.catchPhrase2}> à portée de main</Text>
      <Button
        onPress={() => router.push("/(tabs)/search")}
        size="large"
        styleType="default"
      >
        <Text>Rechercher un soignant</Text>
      </Button>
    </View>
  );
}

function Informations() {
  const title = "Prévention des infections virales (grippe, rhume, COVID-19)";
  const items = [
    "Lavez-vous régulièrement les mains.",
    "Portez un masque si vous êtes malade.",
    "Aérez les pièces quotidiennement.",
    "Évitez les contacts rapprochés avec les malades.",
    "Consultez un médecin si vous avez des symptômes graves.",
  ];
  return (
    <View style={styles.informations}>
      <Text style={styles.infoTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function MyCaregivers() {
  const { user } = useAuth();
  const { history } = useHistory(user?.id);

  const [itemsToShowCount, setItemsToShowCount] = useState(5);

  if (!history) {
    return <Text>Chargement...</Text>;
  }
  const visibleCaregivers = useMemo(() => {
    return history
      .filter((item) => item !== undefined)
      .slice(0, itemsToShowCount);
  }, [history, itemsToShowCount]);

  const handleShowMore = () => {
    setItemsToShowCount(itemsToShowCount + 5);
  };

  return (
    <View style={styles.myCaregivers}>
      <Text style={styles.title}>Mes soignants</Text>
      {history.length !== 0 &&
        visibleCaregivers.map((item, index) => (
          <View
            key={index}
            style={index !== history.length - 1 && styles.itemWrapper}
          >
            <SpecialistLabel item={item} type="summarized" />
          </View>
        ))}
      {history.length > itemsToShowCount && (
        <View style={styles.button}>
          <Button onPress={handleShowMore} size="medium" styleType="empty">
            <Text>Voir plus</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

function Footer() {
  return <View style={styles.footer}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF3FF",
  },
  button: {
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10,
  },
  itemWrapper: {
    marginBottom: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34659A",
    height: 250,
    zIndex: 20,
    marginBottom: 10,
  },
  catchPhrase1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  catchPhrase2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DFF3FF",
  },
  informations: {
    alignSelf: "center",
    width: "95%",
    minHeight: 200,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    padding: 10,
    gap: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: "black",
  },
  text: {
    fontSize: 16,
    color: "#333333",
  },
  myCaregivers: {
    alignSelf: "center",
    width: "85%",
    marginBottom: 10,
  },
  footer: {
    minHeight: 20,
  },
});
