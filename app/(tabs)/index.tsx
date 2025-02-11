import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Tab() {
  const { user, register, login, logout, CheckIsLogged } = useAuth();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    CheckIsLogged();
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    try {
      await login(email, pass);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async (email: string, pass: string) => {
    try {
      register(email, pass);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={user ? styles.logged : styles.notLogged}>
        {user ? user.email : "Non connecté"}
      </Text>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail}></TextInput>
      <Text>Password</Text>
      <TextInput style={styles.input} onChangeText={setPass}></TextInput>
      <Button onPress={() => handleLogin(email, pass)}>Login</Button>
      <Button onPress={() => logout()}>Logout</Button>
      <Button onPress={() => handleRegister(email, pass)}>Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
  },
  logged: {
    color: "green",
  },
  notLogged: {
    color: "red",
  },
});
