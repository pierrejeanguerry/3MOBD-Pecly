import Button from "@/components/Button";
import SpecialistLabel from "@/components/SpecialistLabel";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { theme } from "@/styles/theme";

let Notifications: typeof import("expo-notifications") | null = null;
let getNotificationPermission: any = null;

if (Platform.OS === "android") {
  // @ts-ignore
  import("expo-notifications").then((module) => {
    Notifications = module;
  });

  // @ts-ignore
  import("@/utils/scheduleNotification").then((module) => {
    getNotificationPermission = module.getNotificationPermission;
  });
}

export default function TabScreen() {
  useEffect(() => {
    if (Platform.OS === "android") getGeneralNotifications();
  }, []);

  async function getGeneralNotifications() {
    if (!Notifications) return;
    const allNotifs = await Notifications.getAllScheduledNotificationsAsync();

    const notifSnapshot = await firestore()
      .collection("Notifications")
      .where("timestamp", ">=", new Date())
      .get();
    console.log(notifSnapshot.docs[0].data());

    if (!notifSnapshot.empty) {
      notifSnapshot.docs.forEach(async (notifDoc) => {
        const notifData = notifDoc.data();
        const notifDate: Date = notifData.timestamp.toDate();

        const existingNotif = allNotifs.find(
          (scheduledNotif) =>
            scheduledNotif.content.body === notifData.body &&
            scheduledNotif.content.title === notifData.title
        );

        if (!existingNotif) {
          await scheduleNotification(
            notifData.title,
            notifData.body,
            notifDate
          );
          console.log("Nouvelle notification enregistrée");
        } else {
          console.log("Notification déjà programmée :", notifData.title);
        }
      });
    }
  }

  async function scheduleNotification(
    title: string,
    body: string,
    timestamp: Date
  ) {
    if (!Notifications) return;
    const permission = await getNotificationPermission();
    if (permission !== "granted") return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: {
        date: timestamp,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
  }

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
        onPress={() => router.push("/(tabs)/home/search")}
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
  const [history, setHistory] = useState<User[]>([]);
  const [itemsToShowCount, setItemsToShowCount] = useState(5);

  useEffect(() => {
    if (!user?.id) return;

    const userRef = firestore().doc(`Users/${user?.id}`);

    const unsubscribe = userRef.onSnapshot(
      async (snapshot) => {
        if (!snapshot.exists) {
          setHistory([]);
          return;
        }

        const userData = snapshot.data();
        if (!userData?.history || !Array.isArray(userData.history)) {
          setHistory([]);
          return;
        }

        try {
          const caregivers = await fetchAllCaregivers(
            user?.id,
            userData.history
          );
          setHistory(caregivers);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des caregivers :",
            error
          );
        }
      },
      (error) =>
        console.error("Erreur lors de la récupération de l'historique :", error)
    );

    return () => unsubscribe();
  }, [user?.id]);

  const fetchAllCaregivers = async (
    userId: string,
    historyArray: string[]
  ): Promise<User[]> => {
    const caregivers = await Promise.all(
      historyArray.map(async (element) => {
        const elementRef = await firestore().doc(`Users/${element}`).get();

        if (!elementRef.exists) {
          await firestore()
            .doc(`Users/${userId}`)
            .update({
              history: firestore.FieldValue.arrayRemove(element),
            });
          return null;
        }

        const caregiverData = elementRef.data();
        return caregiverData ? { id: element, ...caregiverData } : null;
      })
    );

    return caregivers.filter((c): c is User => c !== null);
  };

  const visibleCaregivers = useMemo(() => {
    return history
      .filter((item) => item !== undefined)
      .slice(0, itemsToShowCount);
  }, [history, itemsToShowCount]);

  const handleShowMore = () => {
    setItemsToShowCount(itemsToShowCount + 5);
  };

  if (history.length == 0) {
    return;
  }

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
    backgroundColor: theme.colors.backgroundSecondary,
  },
  button: {
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 30 : 0,
  },
  itemWrapper: {
    marginBottom: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
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
    color: theme.colors.backgroundSecondary,
  },
  informations: {
    alignSelf: "center",
    width: "95%",
    minHeight: 200,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 10,
    gap: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textSecondary,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: theme.colors.textPrimary,
  },
  text: {
    fontSize: 16,
    color: theme.colors.textSecondary,
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
