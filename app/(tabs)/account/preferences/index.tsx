import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../components/Button/Button";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function MyAccount() {
    const { logout, user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("../account/");
    };

    return (
        <View style={styles.container}>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>

                        <Link href={"/(tabs)/account/preferences"}>Modifier mon adresse</Link>
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        {" "}
                        <Link href={"/(tabs)/account/infos"}>Instructions et motivations</Link>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        {" "}
                        <Link href={"/(tabs)/account/infos"}>Présentation</Link>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        {" "}
                        <Link href={"/(tabs)/account/infos"}>Payments</Link>
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
