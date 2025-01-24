import { createContext, useContext, useState, ReactNode } from "react";
import { Timestamp } from "@react-native-firebase/firestore";

export type AppointmentData = {
  caregiverId: string;
  patientId: string;
  dateTime: Timestamp;
  motive: string;
  status: string;
};

type AppointmentContextType = {
  appointmentData?: AppointmentData;
  setAppointmentData: (data: AppointmentData) => void;
  clearAppointmentData: () => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointmentData, setAppointmentData] = useState<
    AppointmentData | undefined
  >(undefined);

  const clearAppointmentData = () => {
    setAppointmentData(undefined);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setAppointmentData,
        clearAppointmentData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointment doit être utilisé à l'intérieur d'un AppointmentProvider"
    );
  }
  return context;
};
