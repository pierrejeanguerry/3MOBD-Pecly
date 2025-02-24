import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { theme } from "@/styles/theme";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ScrollView } from "react-native";

function onPress(): void {}

export default function Login() {
  const { login, checkIsLogged } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, pass: string) => {
    try {
      setLoading(true);
      if (await login(email, pass)) {
        setLoading(false);
        router.push("../account/myAccount");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const check = async () => {
      if (await checkIsLogged()) {
        router.replace("../account/myAccount");
      }
    };
    check().then(null);
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.titre}>Se connecter</Text>

          <Text style={styles.label}>Adresse e-mail</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Adresse e-mail"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Mot de passe..."
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={pass}
            onChangeText={setPass}
          />

          <Button
            size={"large"}
            styleType={"primary"}
            onPress={() => handleLogin(email, pass)}
          >
            Se connecter
          </Button>
          {loading && <Text style={{ color: "green" }}>Connexion...</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  input: {
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: 200,
  },
  scroll: {
    flexGrow: 1,
    marginBottom: 20,
  },
});
