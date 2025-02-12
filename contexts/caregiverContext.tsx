import React, { createContext, useContext, useState, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";

type CareData = {
  id: string;
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
    motives: string[];
  };
};

type CaregiverContextType = {
  caregiverData?: CareData;
  loading: boolean;
  error: string;
  fetchCaregiver: (id: string) => Promise<void>;
};

const CaregiverContext = createContext<CaregiverContextType | undefined>(
  undefined
);

export function CaregiverProvider({ children }: { children: ReactNode }) {
  const [caregiverData, setCaregiverData] = useState<CareData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCaregiver(id: string) {
    setLoading(true);
    setError("");
    try {
      const doc = await firestore().collection("Users").doc(id).get();
      if (doc.exists) {
        setCaregiverData({ ...doc.data(), id } as CareData);
      } else {
        setError("Aucun soignant trouvé pour cet ID.");
      }
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CaregiverContext.Provider
      value={{ caregiverData, loading, error, fetchCaregiver }}
    >
      {children}
    </CaregiverContext.Provider>
  );
}

export function useCaregiver() {
  const context = useContext(CaregiverContext);
  if (!context) {
    throw new Error(
      "useCaregiver doit être utilisé à l'intérieur d'un CaregiverProvider."
    );
  }
  return context;
}
