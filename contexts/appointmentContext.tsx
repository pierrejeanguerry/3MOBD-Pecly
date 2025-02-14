import { createContext, useContext, useState, ReactNode } from "react";
import { AppointmentData } from "@/types/appointment";
import { ContextError, ERROR_MESSAGES } from "@/utils/errors";

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
    throw new ContextError(ERROR_MESSAGES.CONTEXT_PROVIDER_ERROR);
  }
  return context;
};
