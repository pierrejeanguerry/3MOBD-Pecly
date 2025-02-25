import {View, Text, StyleSheet, TextInput, Animated, TouchableOpacity} from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import {theme} from "@/styles/theme";

export default function Gender() {
    const { user, saveUser } = useAuth();

    const genre = async (
        gender: string
    ): Promise<void> => {
        if (!user) {
            return;
        }
        try {
            await firestore()
                .collection("Users")
                .doc(user.id)
                .update({
                    gender: gender
                });
            await saveUser({ ...user,    gender: gender });
            console.log("genre enregistrée");

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

    const [gender, setGender] = useState("");
    const [fadeAnim] = useState(new Animated.Value(0));
    const [successMessage, setSuccessMessage] = useState(false);

    const handleGender = async (
        gender: string
    ) => {
        try {
            await genre(gender);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (user) {
            setGender(user.gender || "");
        }
    }, [user]);

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Genre</Text>

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


            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() =>
                    handleGender(gender)
                }
            >
                Appliquer
            </Button>

            {successMessage && (
                <Animated.View
                    style={[styles.successMessage, { opacity: fadeAnim }]}
                >
                    <Text style={styles.successText}>Genre enregistrée !</Text>
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
    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
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
