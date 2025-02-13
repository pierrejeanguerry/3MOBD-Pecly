import React, { createContext, useContext, useState, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";
import { User } from "@/types/user";

type CaregiverContextType = {
  caregiverData?: User;
  loading: boolean;
  error: string;
  fetchCaregiver: (id: string) => Promise<void>;
};

const CaregiverContext = createContext<CaregiverContextType | undefined>(
  undefined
);

export function CaregiverProvider({ children }: { children: ReactNode }) {
  const [caregiverData, setCaregiverData] = useState<User | undefined>(
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
        const data = doc.data();
        if (data) {
          setCaregiverData({
            ...data,
            id,
            name: `${data.firstname} ${data.lastname}`,
          } as User);
        } else {
          setError("Données du soignant non disponibles.");
        }
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
