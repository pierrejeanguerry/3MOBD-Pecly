import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Tab() {

    const router = useRouter();

    const handlePressNom = () => {
        router.push("/(tabs)/account/preferencesPatient/nom");
    };

    const handlePressNumeroTel = () => {
        router.push("/(tabs)/account/preferencesPatient/numeroTel");
    };

    const handlePressGenre = () => {
        router.push("/(tabs)/account/preferencesPatient/genre");
    };


    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Mes préférences</Text>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption} onPress={handlePressNom}>
                    <Text style={styles.privacyOptionText}>
                        Modifier mon nom et prénom
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption} onPress={handlePressNumeroTel}>
                    <Text style={styles.privacyOptionText}>
                        Modifier mon numéro de téléphone
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.privacyOption} onPress={handlePressGenre}>
                    <Text style={styles.privacyOptionText}>
                        Modifier mon genre
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
