import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import {theme} from "@/styles/theme";

export default function Instructions() {
  const { user, saveUser } = useAuth();
  const [instruction, setInstruction] = useState("");
  const [motives, setMotives] = useState<string[]>([]);
  const [mustBeReferred, setMustBeReferred] = useState(false);
  const [newMotive, setNewMotive] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (user?.caregiverDetails) {
      setInstruction(user.caregiverDetails.instruction || "");
      setMotives(user.caregiverDetails.motives || []);
      setMustBeReferred(user.caregiverDetails.mustBeReferred || false);
    }
  }, [user]);

  const updateInstructions = async () => {
    if (!user) return;
    try {
      await firestore()
        .collection("Users")
        .doc(user.id)
        .update({
          "caregiverDetails.instruction": instruction.toLowerCase(),
          "caregiverDetails.motives": motives.map((motive) =>
            motive.toLowerCase()
          ),
          "caregiverDetails.mustBeReferred": mustBeReferred,
        });
      await saveUser({
        ...user,
        caregiverDetails: {
          ...user.caregiverDetails,
          instruction: instruction.toLowerCase(),
          motives: motives.map((motive) => motive.toLowerCase()),
          mustBeReferred: mustBeReferred,
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

  const addMotive = () => {
    if (newMotive.trim() !== "") {
      setMotives([...motives, newMotive.trim()]);
      setNewMotive("");
    }
  };

  const removeMotive = (index: number) => {
    setMotives(motives.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Instructions et motivations</Text>

      <Text style={styles.label}>Saisissez vos instructions</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder={"Les instructions seront visibles par vos patients..."}
        placeholderTextColor="#A9A9A9"
        value={instruction}
        onChangeText={setInstruction}
        multiline={true}
        numberOfLines={7}
        autoCorrect={false}
        autoCapitalize="sentences"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>
          Doit être référé par un professionnel :
        </Text>
        <Switch
          value={mustBeReferred}
          onValueChange={setMustBeReferred}
          trackColor={{ false: "#767577", true: "#4CAF50" }}
          thumbColor={mustBeReferred ? "#fff" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.label}>Saisissez vos motifs</Text>
      <View style={styles.motivesContainer}>
        <TextInput
          style={[styles.input, styles.motivesInput]}
          placeholder="Ex: Première consultation..."
          placeholderTextColor="#A9A9A9"
          value={newMotive}
          onChangeText={setNewMotive}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMotive}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={motives}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.motiveItem}>
            <Text style={styles.motiveText}>{item}</Text>
            <TouchableOpacity onPress={() => removeMotive(index)}>
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
          <Text style={styles.successText}>Instructions et motifs enregistrées !</Text>
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
    backgroundColor: theme.colors.backgroundSecondary,
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
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
  },
  motivesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  motivesInput: {
    flex: 1,
    marginRight: 10,
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
  motiveItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
  motiveText: {
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
