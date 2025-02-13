import Button from "@/components/Button";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useAuth } from "@/hooks/useAuth";
import { useHistory } from "@/hooks/useHistory";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tab() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Informations />
        <MyCaregivers />
      </ScrollView>
    </View>
  );
}

function Header() {
  const router = useRouter();

  return (
    <View>
      <Text style={styles.title}>PECLY</Text>
      <Button
        onPress={() => router.push("/(tabs)/search")}
        size="large"
        styleType="empty"
      >
        <Text>Rechercher</Text>
      </Button>
    </View>
  );
}

function Informations() {
  return (
    <>
      <Text>Infos</Text>
    </>
  );
}

function MyCaregivers() {
  const { user } = useAuth();
  const { history } = useHistory(user?.id);

  const [visibleCount, setVisibleCount] = useState(5);

  if (!history) {
    return <Text>Chargement...</Text>;
  }

  const handleShowMore = () => {
    setVisibleCount(history.length);
  };

  return (
    <View>
      <Text style={styles.title}>Mes soignants</Text>
      {history.length !== 0 &&
        history
          .filter((item): item is User => item !== undefined)
          .slice(0, visibleCount)
          .map((item, index) => (
            <View
              key={index}
              style={index !== history.length - 1 && styles.itemWrapper}
            >
              <SpecialistLabel item={item} type="summarized" />
            </View>
          ))}
      {history.length > visibleCount && (
        <View style={styles.container}>
          <Button onPress={handleShowMore} size="medium" styleType="empty">
            <Text>Voir plus</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 100 : 20,
    backgroundColor: "#DFF3FF",
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10,
  },
  itemWrapper: {
    marginBottom: 10,
  },
});
