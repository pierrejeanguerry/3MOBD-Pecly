import {Platform} from "react-native";

let Notifications: typeof import("expo-notifications") | null = null;

if (Platform.OS === "android") {
  // @ts-ignore
  import("expo-notifications").then((module) => {
    Notifications = module;
  });
}

export async function getNotificationPermission() {
  if (Notifications) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus;
  }
}
