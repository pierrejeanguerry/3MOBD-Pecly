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
import { useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { Dropdown } from 'react-native-element-dropdown';
import specialities from "../home/search/specialties.json"

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function SignupCaregiver() {
  const { registerCaregiver, login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [gender, setGender] = useState("");
  const [speciality, setSpeciality] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegisterCaregiver = async (
    email: string,
    pass: string,
    lastName: string,
    firstName: string,
    phone: string,
    licenseNumber: string,
    gender: string,
    speciality: string
  ) => {
    try {
      if (!email.match(emailRegex)) {
        alert("Veuillez renseigner un email valide");
        return;
      }
      setLoading(true);
      await registerCaregiver(
        email,
        pass,
        lastName,
        firstName,
        phone,
        licenseNumber,
        gender,
        speciality
      );
      if (await login(email, pass)) {
        setLoading(false);
        router.push("../account");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.titre}>Créer un compte soignant</Text>

          <Text style={styles.label}>Saisissez votre adresse e-mail</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="adresse e-mail"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="mot de passe..."
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={pass}
            onChangeText={setPass}
          />

          <Text style={styles.label}>Name et Prénom</Text>
          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="Name..."
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

          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="06 00 00 00 00"
            placeholderTextColor="#A9A9A9"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />



          <Text style={styles.label}>Saisissez votre numéro de CPS</Text>
          <TextInput
            style={styles.input}
            placeholder="cps..."
            placeholderTextColor="#A9A9A9"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
          />

          <Text style={styles.label}>Spécialité</Text>
          <Dropdown
              style={styles.dropdown}
              data={specialities.map((speciality) => ({
                label: speciality,
                value: speciality,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Sélectionnez une spécialité"
              value={speciality}
              onChange={(item) => setSpeciality(item.value)}
          />

          <View style={{ alignSelf: "center" }}>
            <Button
              size={"large"}
              styleType={"primary"}
              onPress={() =>
                handleRegisterCaregiver(
                  email,
                  pass,
                  lastName,
                  firstName,
                  phone,
                  licenseNumber,
                  gender,
                  speciality,
                )
              }
            >
              Créer un compte
            </Button>
            <Spinner
              visible={loading}
              textContent={"Création du compte..."}
              textStyle={{ color: "#FFF" }}
              overlayColor="rgba(0, 0, 0, 0.75)"
            />
          </View>
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
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nameInput: {
    flex: 1,
    marginHorizontal: 5,
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
  dropdown: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  scroll: {
    flexGrow: 1,
    marginBottom: 20,
  },
});
