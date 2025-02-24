import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../components/Button/Button";
import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { theme } from "@/styles/theme";

function onPress(): void {}

export default function Account() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const handlePressPreferences = () => {
    router.push("../account/preferences/");
  };
  const handlePressInfos = () => {
    router.push("/(tabs)/account/infos");
  };

  return (
    <>
      <Stack.Screen options={{ headerBackVisible: false }} />
      <View style={styles.container}>
        {!user && (
          <>
            <Text style={styles.titre}>Mon compte</Text>
            <Text style={styles.description}>
              Pecly est au service de votre santé et celle de vos proches
            </Text>

            <Button
              size={"medium"}
              styleType={"primary"}
              onPress={() => onPress}
            >
              <Link href={"/(tabs)/account/login"}>Se connecter</Link>
            </Button>
            <Text style={styles.signupText}>
              Vous n’avez pas de compte ?{" "}
              <Link href={"/(tabs)/account/signup"} style={styles.signupLink}>
                S’inscrire
              </Link>
            </Text>
            <Text style={styles.signupText}>
              Vous êtes soignant ?{" "}
              <Link
                href={"/(tabs)/account/signupCaregiver"}
                style={styles.signupLink}
              >
                S’inscrire
              </Link>
            </Text>

            <View style={styles.privacySection}>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={handlePressInfos}
              >
                <Text style={styles.privacyOptionText}>
                  Informations légales
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {user && (
          <>
            <View style={styles.profileSection}>
              <Text style={styles.name}>
                {user?.firstname} {user?.lastname}
              </Text>
            </View>

            <View style={styles.privacySection}>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={handlePressPreferences}
              >
                <Text style={styles.privacyOptionText}>Mes préférences</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={handlePressInfos}
              >
                <Text style={styles.privacyOptionText}>
                  Informations légales
                </Text>
              </TouchableOpacity>
            </View>

            <Button size={"medium"} styleType={"danger"} onPress={handleLogout}>
              Se déconnecter
            </Button>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#43193B",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 22,
    color: "#333",
  },
  signupText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  signupLink: {
    color: theme.colors.textEmphasis,
    fontWeight: "bold",
  },
  privacySection: {
    marginTop: 30,
  },
  privacyOption: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  privacyOptionText: {
    fontSize: 16,
    color: "#333",
  },
  profileSection: {
    backgroundColor: "#3B74F2",
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
  },
  name: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
