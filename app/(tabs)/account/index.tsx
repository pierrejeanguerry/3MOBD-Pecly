import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../components/Button/Button";
import { Link, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { theme } from "@/styles/theme";
import { formatName } from "@/utils/formatString";

export default function Account() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerBackVisible: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Mon compte</Text>

        {!user ? (
          <>
            <Text style={styles.description}>
              Pecly est au service de votre santé et celle de vos proches
            </Text>

            <Button
              size="medium"
              styleType="primary"
              onPress={() => handleNavigation("/(tabs)/account/login")}
            >
              <Text>Se connecter</Text>
            </Button>

            <Text style={styles.signupText}>
              Vous n’avez pas de compte ?{" "}
              <Link href="/(tabs)/account/signup" style={styles.signupLink}>
                S’inscrire
              </Link>
            </Text>

            <Text style={styles.signupText}>
              Vous êtes soignant ?{" "}
              <Link
                href="/(tabs)/account/signupCaregiver"
                style={styles.signupLink}
              >
                S’inscrire
              </Link>
            </Text>
          </>
        ) : (
          <>
            <View style={styles.profileSection}>
              <Text style={styles.name}>
                {formatName(user.firstname)} {formatName(user.lastname)}
              </Text>
            </View>
          </>
        )}

        <View style={styles.privacySection}>
          {user && (
            <Button
              size="large"
              styleType="empty"
              onPress={() => handleNavigation("/(tabs)/account/preferences")}
            >
              <Text>Mes préférences</Text>
            </Button>
          )}

          <Button
            size="large"
            styleType="empty"
            onPress={() => handleNavigation("/(tabs)/account/infos")}
          >
            <Text>Informations légales</Text>
          </Button>
        </View>

        {user && (
          <View style={styles.disconnectionContainer}>
            <Button size="large" styleType="danger" onPress={logout}>
              Se déconnecter
            </Button>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.textEmphasis,
    marginBottom: 10,
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
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  privacyOption: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  privacyOptionText: {
    fontSize: 16,
    color: "#333",
  },
  profileSection: {
    backgroundColor: theme.colors.backgroundTertiary,
    alignItems: "center",
    minWidth: 300,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: theme.colors.backgroundPrimary,
    borderWidth: 2,
  },
  name: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.textSecondary,
    fontWeight: "700",
  },
  disconnectionContainer: {
    marginTop: 30,
  },
});
