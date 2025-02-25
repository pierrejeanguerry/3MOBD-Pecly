import { View, Text, StyleSheet, Switch, Animated } from "react-native";
import Button from "../../../../components/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function Payment() {
    const { user, saveUser } = useAuth();

    const [paymentMeans, setPaymentMeans] = useState({
        card: false,
        cash: false,
        check: false,
    });
    const [thirdParty, setThirdParty] = useState<string | undefined>("");
    const [vitalCard, setVitalCard] = useState<boolean | undefined>(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        if (user?.caregiverDetails?.paymentMeans && user.caregiverDetails?.price) {
            setPaymentMeans(user.caregiverDetails.paymentMeans);
            setThirdParty(user.caregiverDetails.price.thirdParty);
            setVitalCard(user.caregiverDetails.price.vitalCard);
        }
    }, [user]);

    const updatePayments = async () => {
        if (!user)
            return;
        try {
            await firestore()
                .collection("Users")
                .doc(user.id)
                .update({
                    "caregiverDetails.paymentMeans": paymentMeans,
                    "caregiverDetails.thirdParty": thirdParty,
                    "caregiverDetails.vitalCard": vitalCard,
                });
            await saveUser({...user, caregiverDetails: {...user.caregiverDetails, paymentMeans, price: {...user.caregiverDetails?.price, thirdParty, vitalCard,},},});

            console.log("Moyens de paiement enregistrés");

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

    const toggleSwitch = (type: "card" | "cash" | "check") => {
        setPaymentMeans((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const handleThirdPartyChange = (option: string) => {
        setThirdParty((prev) => {
            const options = prev.split(",");
            if (options.includes(option)) {
                return options.filter(item => item !== option).join(",");
            } else {
                return options.length === 1 && options[0] === "" ? option : [...options, option].join(",");
            }
        });

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Moyens de Paiement</Text>

            <Text style={styles.label}>Sélectionnez les moyens de paiement acceptés :</Text>

            <View style={styles.motivesContainer}>
                <View style={styles.paymentOption}>
                    <Text>Carte</Text>
                    <Switch value={paymentMeans.card} onValueChange={() => toggleSwitch("card")} />
                </View>

                <View style={styles.paymentOption}>
                    <Text>Cash</Text>
                    <Switch value={paymentMeans.cash} onValueChange={() => toggleSwitch("cash")} />
                </View>

                <View style={styles.paymentOption}>
                    <Text>Chèque</Text>
                    <Switch value={paymentMeans.check} onValueChange={() => toggleSwitch("check")} />
                </View>
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.label}>La carte vitale est accetpée</Text>
                <Switch
                    value={vitalCard}
                    onValueChange={setVitalCard}
                    trackColor={{ false: "#767577", true: "#4CAF50" }}
                    thumbColor={vitalCard ? "#fff" : "#f4f3f4"}
                />
            </View>

            <Text style={styles.label}>Sélectionnez l'organisme tiers</Text>
            <View style={styles.motivesContainer}>
                <View style={styles.paymentOption}>
                    <Text>L'Assurance Maladie Obligatoire (AMO)</Text>
                    <Switch
                        value={thirdParty === "AMO"}
                        onValueChange={() => handleThirdPartyChange("AMO")}
                    />
                </View>

                <View style={styles.paymentOption}>
                    <Text>Les Complémentaires Santé (AMC)</Text>
                    <Switch
                        value={thirdParty === "AMC"}
                        onValueChange={() => handleThirdPartyChange("AMC")}
                    />
                </View>

                <View style={styles.paymentOption}>
                    <Text>Les Organismes Spécifiques</Text>
                    <Switch
                        value={thirdParty === "Specific"}
                        onValueChange={() => handleThirdPartyChange("Specific")}
                    />
                </View>
            </View>

            <Button size="medium" styleType="primary" onPress={updatePayments}>
                Appliquer
            </Button>


            {successMessage && (
                <Animated.View
                    style={[styles.successMessage, { opacity: fadeAnim }]}
                >
                    <Text style={styles.successText}>Modifications enregistrées !</Text>
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
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    motivesContainer: {
        width: "100%",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 20,
    },
    paymentOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 10,
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
