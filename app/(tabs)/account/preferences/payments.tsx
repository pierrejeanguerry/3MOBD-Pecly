import {View, Text, StyleSheet, Switch} from "react-native";
import Button from "../../../../components/Button/Button";
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import React, {useEffect, useState} from "react";
import {usePreferences} from "@/hooks/usePreferences";


export default function Payment() {
    const {payments} = usePreferences();
    const [paymentMeans, setPaymentMeans] = useState({
        card: false,
        cash: false,
        check: false,
    });

    const toggleSwitch = (type: "card" | "cash" | "check") => {
        setPaymentMeans((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const handlePayments = async (
        presentation: string,
    ) => {
        try {
            await payments(paymentMeans);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Moyens de Payments</Text>

            <View style={styles.paymentOption}>
                <Text>Carte</Text>
                <Switch
                    value={paymentMeans.card}
                    onValueChange={() => toggleSwitch("card")}
                />
            </View>

            <View style={styles.paymentOption}>
                <Text>Cash</Text>
                <Switch
                    value={paymentMeans.cash}
                    onValueChange={() => toggleSwitch("cash")}
                />
            </View>

            <View style={styles.paymentOption}>
                <Text>Chèque</Text>
                <Switch
                    value={paymentMeans.check}
                    onValueChange={() => toggleSwitch("check")}
                />
            </View>

            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() =>
                    handlePayments(paymentMeans)
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
    paymentContainer: {
        marginVertical: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    paymentOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
    },
});
