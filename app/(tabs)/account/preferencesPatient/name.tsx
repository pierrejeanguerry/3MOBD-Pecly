import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function Name() {
    const { user, saveUser } = useAuth();

    const name = async (
        lastname: string,
        firstname: string,
    ): Promise<void> => {
        if (!user) {
            return;
        }
        try {
            await firestore()
                .collection("Users")
                .doc(user.id)
                .update({
                     lastname: lastname.toLowerCase(), firstname: firstname.toLowerCase(),
                });
            await saveUser({ ...user,    lastname: lastname.toLowerCase(), firstname: firstname.toLowerCase() });
            console.log("nom et prénom enregistrée");

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

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [fadeAnim] = useState(new Animated.Value(0));
    const [successMessage, setSuccessMessage] = useState(false);

    const handleName = async (
        lastname: string,
        firstname: string,
    ) => {
        try {
            await name(lastname, firstname);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (user) {
            setLastname(user.lastname || "");
            setFirstname(user.firstname || "");
        }
    }, [user]);

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Nom et prénom</Text>

            <View style={styles.nomContainer}>
                <TextInput
                    style={[styles.input, styles.nomInput]}
                    placeholder={lastname || "Name..."}
                    placeholderTextColor="#A9A9A9"
                    value={lastname}
                    onChangeText={setLastname}
                />

                <TextInput
                    style={[styles.input, styles.nomInput]}
                    placeholder={firstname || "Prénom..."}
                    placeholderTextColor="#A9A9A9"
                    value={firstname}
                    onChangeText={setFirstname}
                />
            </View>


            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() =>
                    handleName(lastname, firstname)
                }
            >
                Appliquer
            </Button>

            {successMessage && (
                <Animated.View
                    style={[styles.successMessage, { opacity: fadeAnim }]}
                >
                    <Text style={styles.successText}>Nom et prénom enregistrée !</Text>
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
