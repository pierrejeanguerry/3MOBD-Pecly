import { useAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const { checkIsLogged, user } = useAuth();

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    checkIsLogged();
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.backgroundPrimary,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myAppointment"
        options={{
          title: "Rendez-vous",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
          tabBarItemStyle: { display: `${user ? "flex" : "none"}` },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Compte",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
