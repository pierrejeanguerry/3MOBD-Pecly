import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { formatName } from "@/utils/formatString";

export default function Address() {
  const { user, saveUser } = useAuth();

  const adresse = async (
    country: string,
    city: string,
    postalCode: string,
    street: string
  ): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      const userRef = await firestore()
        .collection("Users")
        .doc(user.id)
        .update({
          address: {
            country: country.toLowerCase(),
            city: city.toLowerCase(),
            postalCode: postalCode,
            street: street.toLowerCase(),
          },
        });
      await saveUser({
        ...user,
        address: {
          country: country.toLowerCase(),
          city: city.toLowerCase(),
          postalCode: postalCode.toLowerCase(),
          street: street.toLowerCase(),
        },
      });

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

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [successMessage, setSuccessMessage] = useState(false);

  const handleAdresse = async (
    country: string,
    city: string,
    postalCode: string,
    street: string
  ) => {
    try {
      await adresse(country, city, postalCode, street);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.address) {
      setCountry(user.address.country || "");
      setCity(user.address.city || "");
      setPostalCode(user.address.postalCode || "");
      setStreet(user.address.street || "");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Adresse</Text>

      <View style={styles.adresseContainer}>
        <TextInput
          style={[styles.input, styles.adresseInput]}
          placeholder={country || "Pays..."}
          placeholderTextColor="#A9A9A9"
          value={formatName(country)}
          onChangeText={setCountry}
        />

        <TextInput
          style={[styles.input, styles.adresseInput]}
          placeholder={city || "Ville..."}
          placeholderTextColor="#A9A9A9"
          value={formatName(city)}
          onChangeText={setCity}
        />
      </View>

      <View style={styles.adresseContainer}>
        <TextInput
          style={[styles.input, styles.adresseInput]}
          placeholder={postalCode || "Code postal..."}
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={postalCode}
          onChangeText={setPostalCode}
        />

        <TextInput
          style={[styles.input, styles.adresseInput]}
          placeholder={street || "Rue..."}
          placeholderTextColor="#A9A9A9"
          value={formatName(street)}
          onChangeText={setStreet}
        />
      </View>

      <Button
        size={"medium"}
        styleType={"primary"}
        onPress={() => handleAdresse(country, city, postalCode, street)}
      >
        Appliquer
      </Button>

      {successMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>Adresse enregistrée !</Text>
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
    backgroundColor: "#DFF3FF",
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
  adresseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    width: "100%",
  },
  adresseInput: {
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
