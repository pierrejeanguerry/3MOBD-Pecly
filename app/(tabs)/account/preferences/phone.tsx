import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import {theme} from "@/styles/theme";

export default function Phone() {
  const { user, saveUser } = useAuth();

  const phoneNumber = async (phone: string): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      await firestore()
        .collection("Users")
        .doc(user.id)
        .update({
          contact: { phone: phone },
        });
      await saveUser({ ...user, contact: { phone: phone } });

      setSuccessMessage(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setSuccessMessage(false);
        fadeAnim.setValue(0);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  const [phone, setPhone] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [successMessage, setSuccessMessage] = useState(false);

  const handlePhoneNumber = async (phone: string) => {
    try {
      await phoneNumber(phone);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.contact) {
      setPhone(user.contact.phone || "");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Numéro de téléphone</Text>

      <View style={styles.nomContainer}>
        <TextInput
          style={[styles.input, styles.nomInput]}
          placeholder={phone || "Numéro de téléphone..."}
          placeholderTextColor="#A9A9A9"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <Button
        size={"medium"}
        styleType={"primary"}
        onPress={() => handlePhoneNumber(phone)}
      >
        Appliquer
      </Button>

      {successMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>
            Numéro de téléphone enregistrée !
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#43193B",
  },
  input: {
    backgroundColor: "#FFF",
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
  nomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    width: "100%",
  },
  nomInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  successMessage: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
