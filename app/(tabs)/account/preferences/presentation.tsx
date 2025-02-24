import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function Presentation() {

    const { user, saveUser } = useAuth();

    const presentations = async (presentation: string): Promise<void> => {
        if (!user) {
            return;
        }
        try {
            await firestore()
                .collection("Users")
                .doc(user.id)
                .update({ "caregiverDetails.presentation": presentation.toLowerCase() });
            await saveUser({ ...user, caregiverDetails: { presentation: presentation.toLowerCase() } });
            console.log("Présentation enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };

    const [presentation, setPresentation] = useState("");
    const [fadeAnim] = useState(new Animated.Value(0));
    const [successMessage, setSuccessMessage] = useState(false);

    const handlePresentations = async (presentation: string) => {
        try {
            await presentations(presentation);

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
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (user?.caregiverDetails?.presentation) {
            setPresentation(user.caregiverDetails.presentation);
        }
    }, [user]);

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Présentation</Text>

            <Text style={styles.label}>Saisissez votre présentation</Text>
            <TextInput
                style={styles.input}
                placeholder={presentation || "Bonjour, je suis médecin généraliste à ..."}
                placeholderTextColor="#A9A9A9"
                value={presentation}
                onChangeText={setPresentation}
            />

            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() => handlePresentations(presentation)}
            >
                Appliquer
            </Button>

            {successMessage && (
                <Animated.View
                    style={[styles.successMessage, { opacity: fadeAnim }]}
                >
                    <Text style={styles.successText}>Présentation enregistrée !</Text>
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
        marginTop: 30,
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
        marginVertical: 10,
        marginBottom: 20,
        fontSize: 14,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        width: "100%",
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
