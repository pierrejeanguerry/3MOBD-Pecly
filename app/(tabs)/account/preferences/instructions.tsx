import {View, Text, StyleSheet, TextInput} from "react-native";
import Button from "../../../../components/Button/Button";
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import React, {useEffect, useState} from "react";
import {usePreferences} from "@/hooks/usePreferences";
import firestore from "@react-native-firebase/firestore";

export default function Instructions() {

    const {user, saveUser} = useAuth()

    const instructions = async (
        instruction: string,
        motives: string[],
    ): Promise<void> => {
        if (!user) {
            return;
        }
        try {
            const userRef = await firestore()
                .collection("Users")
                .doc(user.id)
                .update({instructions :{instruction: instruction, motives: motives}});
            await saveUser({...user, caregiverDetails :{instruction: instruction, motives: motives}});
            console.log("adresse enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };

    const [instruction, setInstruction] = useState("");
    const [motives, setMotives] = useState("");

    const handleInstructions = async (
        instruction: string,
        motives: string[],
    ) => {
        try {
            await instructions(instruction, motives);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Instructions et motivations</Text>


            <Text style={styles.label}>Saissisez vos instructions</Text>
            <TextInput
                style={styles.input}
                placeholder="Les instructions seront visibles par vos patients..."
                placeholderTextColor="#A9A9A9"
                value={instruction}
                onChangeText={setInstruction}
            />

            <Text style={styles.label}>Saissisez vos motivations</Text>
            <View style={styles.motivesContainer}>
                <TextInput
                    style={[styles.input, styles.motivesInput]}
                    placeholder="Première consultation..."
                    placeholderTextColor="#A9A9A9"
                    value={motives}
                    onChangeText={setMotives}
                />

                <TextInput
                    style={[styles.input, styles.motivesInput]}
                    placeholder="Vaccin..."
                    placeholderTextColor="#A9A9A9"
                    value={motives}
                    onChangeText={setMotives}
                />
            </View>

            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() =>
                    handleInstructions(instruction, motives)
                }
            >
                Appliquer </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFF3FF",
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
        marginBottom: 10,
        color: "#333",
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
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 2,
    },
    motivesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,

    },
    motivesInput: {
        flex: 1,
        marginHorizontal: 5,
    },
});
