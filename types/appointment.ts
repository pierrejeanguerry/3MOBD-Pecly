import { Timestamp } from "@react-native-firebase/firestore";

export type AppointmentData = {
  caregiverId?: string;
  patientId?: string;
  dateTime?: Timestamp;
  motive?: string;
  status?: string;
};
