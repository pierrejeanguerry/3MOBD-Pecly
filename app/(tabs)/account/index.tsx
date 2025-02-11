import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "../../../components/Button/Button";
import {Link} from "expo-router";
import {useEffect} from "react";
import { useAuth } from "@/hooks/useAuth";


function onPress(): void {
}

export default function Tab() {


    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Mon compte</Text>
            <Text style={styles.description}>
                Pecly est au service de votre santé et celle de vos proches
            </Text>


            <Button size={"medium"} styleType={"primary"} onPress={() => onPress}><Link href={"/(tabs)/account/login"}>Se connecter</Link></Button>
            <Text style={styles.signupText}>
                Vous n’avez pas de compte ? <Link href={"/(tabs)/account/signup"}
                                                  style={styles.signupLink}>S’inscrire</Link>
            </Text>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>Mes préférences</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>
                        <Link href={"/(tabs)/account/infos"}>Informations légales </Link>
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
    description: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 22,
        color: "#333",
    },
    signupText: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 14,
        color: "#333",
    },
    signupLink: {
        color: "#0A85EB",
        fontWeight: "bold",
    },
    privacySection: {
        marginTop: 30,
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
