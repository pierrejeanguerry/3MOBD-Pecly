import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../../components/Button/Button";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";

export default function Tab() {


    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Mes préférences</Text>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        <Link href={"/(tabs)/account/preferences/adresse"}>Modifier mon adresse</Link>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        <Link href={"/(tabs)/account/preferences/instructions"}>Instructions et motivations</Link>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        <Link href={"/(tabs)/account/preferences/presentation"}>Présentation</Link>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        <Link href={"/(tabs)/account/preferences/payments"}>Moyens de payments</Link>
                    </Text>
                </TouchableOpacity>
            </View>


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
    privacySection: {
        margin: 30,
    },
    privacyOption: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    privacyOptionText: {
        fontSize: 16,
        color: "#333",
    },
});
