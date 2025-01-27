import { useState, useEffect, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";

interface UseNextAvailabilityResult {
  availability: string | null;
  loading: boolean;
  error: string | null;
}

export const useNextAvailability = (
  practitionerId: string
): UseNextAvailabilityResult => {
  const [availability, setAvailability] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getNextAvailability = useCallback(async () => {
    setLoading(true);
    setError(null);
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    try {
      const availabilities = await firestore()
        .collection(`Users/${practitionerId}/Availabilities`)
        .where("date", ">=", todayString)
        .orderBy("date", "asc")
        .limit(1)
        .get();

      if (!availabilities.empty) {
        const nextAvailability = availabilities.docs[0].data();
        const date = nextAvailability.date;
        const formattedDate = format(date, "dd/MM/yyyy");
        setAvailability(formattedDate);
      } else {
        setAvailability(null);
      }
    } catch (e) {
      setError("Erreur lors de la récupération des disponibilités.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [practitionerId]);

  useEffect(() => {
    getNextAvailability();
  }, [getNextAvailability]);

  return { availability, loading, error };
};
