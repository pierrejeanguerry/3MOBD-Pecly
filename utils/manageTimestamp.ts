import { Timestamp } from "@react-native-firebase/firestore";

export function getTodayTimestamp() {
  let today = Timestamp.now().toDate();
  today.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(today);
}
