import { useAuth } from "@/hooks/useAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const { checkIsLogged } = useAuth();

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    checkIsLogged();
  }, []);
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          // title: "Rechercher",
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome size={28} name="search" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="myAppointment"
        options={{
          title: "Rendez-vous",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
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
