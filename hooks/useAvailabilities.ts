import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";

export type Availability = {
  date: string;
  slots: string[];
  value: Date;
};

export function useAvailabilities(caregiverId?: string) {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caregiverId) return;

    const fetchAvailabilities = async () => {
      setLoading(true);
      setError(null);
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      try {
        const availabilities = await firestore()
          .collection(`Users/${caregiverId}/Availabilities`)
          .where("date", ">=", todayString)
          .orderBy("date", "asc")
          .get();

        if (!availabilities.empty) {
          const formattedData = availabilities.docs.map((doc) => {
            const docData = doc.data() as Availability;
            const formattedDate = format(new Date(docData.date), "dd/MM/yyyy");
            return {
              slots: docData.slots.sort(),
              date: formattedDate,
              value: new Date(docData.date),
            };
          });
          setAvailabilities(formattedData);
        } else {
          setAvailabilities([]);
        }
      } catch (e) {
        setError("Erreur lors de la récupération des disponibilités.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, [caregiverId]);

  return { availabilities, loading, error };
}
