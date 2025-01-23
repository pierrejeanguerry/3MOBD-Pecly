import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

type CareData = {
  name: string;
  icon?: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  caregiverDetails: {
    speciality: string;
    presentation: string;
  };
};

export function useCaregiver(caregiverId?: string) {
  const [data, setData] = useState<CareData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!caregiverId) return;

    async function fetchCaregiver() {
      setLoading(true);
      setError("");
      try {
        const doc = await firestore()
          .collection("Users")
          .doc(caregiverId)
          .get();
        if (doc.exists) {
          setData(doc.data() as CareData);
        } else {
          setError("Aucun praticien trouvé pour cet ID.");
        }
      } catch (err: any) {
        setError(err.message || "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    fetchCaregiver();
  }, [caregiverId]);

  return { data, loading, error };
}
