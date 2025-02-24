import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Button from "../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function Signup() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (
    email: string,
    pass: string,
    gender: string,
    lastName: string,
    firstName: string,
    phone: string
  ) => {
    try {
      await register(email, pass, gender, lastName, firstName, phone);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.titre}>Créer un compte</Text>

          <Text style={styles.label}>Saisissez votre adresse e-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="adresse e-mail"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="mot de passe..."
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={pass}
            onChangeText={setPass}
          />

          <Text style={styles.label}>Sexe à l’état civil</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Féminin" && styles.genderButtonSelected,
              ]}
              onPress={() => setGender("Féminin")}
            >
              <Text style={styles.genderText}>Féminin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Masculin" && styles.genderButtonSelected,
              ]}
              onPress={() => setGender("Masculin")}
            >
              <Text style={styles.genderText}>Masculin</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nom et Prénom</Text>
          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="Nom..."
              placeholderTextColor="#A9A9A9"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="Prénom..."
              placeholderTextColor="#A9A9A9"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="06 00 00 00 00"
            placeholderTextColor="#A9A9A9"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Button
            size={"large"}
            styleType={"primary"}
            onPress={() =>
              handleRegister(email, pass, gender, lastName, firstName, phone)
            }
          >
            Créer un compte
          </Button>
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
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: theme.colors.backgroundTertiary,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  genderButtonSelected: {
    backgroundColor: "#007BFF",
  },
  genderText: {
    fontSize: 14,
    color: "#333",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nameInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  scroll: {
    flexGrow: 1,
    marginBottom: 20,
  },
});
