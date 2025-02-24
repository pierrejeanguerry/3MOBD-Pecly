import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Tab() {

    const router = useRouter();

    const handlePressAdresse = () => {
        router.push("/(tabs)/account/preferences/adresse");
    };

    const handlePressInstruction = () => {
        router.push("/(tabs)/account/preferences/instructions");
    };

    const handlePressPresentation = () => {
        router.push("/(tabs)/account/preferences/presentation");
    };

    const handlePressPayment = () => {
        router.push("/(tabs)/account/preferences/payments");
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Mes préférences</Text>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption} onPress={handlePressAdresse}>
                    <Text style={styles.privacyOptionText}>
                        Modifier mon adresse
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption} onPress={handlePressInstruction}>
                    <Text style={styles.privacyOptionText}>
                        Instructions et motivations
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption} onPress={handlePressPresentation}>
                    <Text style={styles.privacyOptionText}>
                       Présentation
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption} onPress={handlePressPayment}>
                    <Text style={styles.privacyOptionText}>
                       Moyens de payments
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
