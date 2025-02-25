import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import firestore from "@react-native-firebase/firestore";

type Price = {
  price: number;
  title: string;
};

export default function PricingScreen() {
  const { user, saveUser } = useAuth();
  const [newPricing, setNewPricing] = useState<Price>({ title: "", price: 0 });
  const [pricings, setPricings] = useState<Price[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (user?.caregiverDetails) {
      setPricings((user.caregiverDetails.price?.prices || []) as Price[]);
    }
  }, [user]);

  const addPricing = () => {
    if (newPricing?.title.trim() !== "" && newPricing?.price != null) {
      setPricings([...pricings, newPricing]);
      setNewPricing({ title: "", price: 0 });
    }
  };

  const removePricing = (index: number) => {
    setPricings(pricings.filter((_, i) => i !== index));
  };

  const updateInstructions = async () => {
    if (!user) return;
    try {
      await saveUser({
        ...user,
        caregiverDetails: {
          ...user.caregiverDetails,
          price: { ...user.caregiverDetails?.price, prices: pricings },
        },
      });

      await firestore().collection("Users").doc(user.id).update(user);

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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saisissez vos tarifs</Text>
      <View style={styles.pricingContainer}>
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="Ex: Première consultation..."
          placeholderTextColor="#A9A9A9"
          value={newPricing?.title}
          onChangeText={(text) =>
            setNewPricing((prev) => ({ ...prev, title: text } as Price))
          }
        />
        <TextInput
          placeholder="Ex: 30€"
          style={[styles.input, styles.priceInput]}
          keyboardType="numeric"
          placeholderTextColor="#A9A9A9"
          value={newPricing?.price?.toString() || ""}
          onChangeText={(text) =>
            setNewPricing(
              (prev) => ({ ...prev, price: parseFloat(text) || 0 } as Price)
            )
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={addPricing}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pricings}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }: { item: Price; index: number }) => (
          <View style={styles.pricingItem}>
            <Text style={styles.pricingText}>
              {item.title}
              {": "}
              {item.price}€
            </Text>
            <TouchableOpacity onPress={() => removePricing(index)}>
              <Text style={styles.removeButton}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button size="medium" styleType="primary" onPress={updateInstructions}>
        Appliquer
      </Button>
      {successMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>Tarifs enregistrés !</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFF3FF",
    padding: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#43193B",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
  },
  pricingContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  titleInput: {
    flex: 3,
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  pricingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
  pricingText: {
    fontSize: 14,
    color: "#333",
  },
  removeButton: {
    fontSize: 18,
    color: "red",
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
