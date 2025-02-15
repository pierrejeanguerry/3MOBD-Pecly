import { useCaregiver } from "@/contexts/caregiverContext";
import { User } from "@/types/user";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useHistory = (userId?: string) => {
  const [history, setHistory] = useState<(User | undefined)[]>([]);

  const fetchHistory = async () => {
    try {
      const userRef = await firestore().doc(`Users/${userId}`).get();
      const userData = userRef.data();
      if (userData?.history) {
        setHistory(userData.history);
        fetchAllCaregivers(userData.history);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique :", error);
    }
  };

  const fetchAllCaregivers = async (historyArray: string[]) => {
    try {
      const caregivers = await Promise.all(
        historyArray.map(async (element) => {
          const elementRef = await firestore().doc(`Users/${element}`).get();

          if (!elementRef.exists) {
            await firestore()
              .doc(`Users/${userId}`)
              .update({
                history: firestore.FieldValue.arrayRemove(element),
              });
            return undefined;
          }

          const caregiverData = elementRef.data();
          return caregiverData ? { id: element, ...caregiverData } : undefined;
        })
      );

      setHistory(caregivers.filter((c): c is User => c !== undefined));
    } catch (error) {
      console.error("Erreur lors de la récupération des caregivers :", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchHistory();
  }, [userId]);

  return { history };
};
