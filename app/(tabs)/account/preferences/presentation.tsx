import {View, Text, StyleSheet, TextInput} from "react-native";
import Button from "../../../../components/Button/Button";
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import React, {useEffect, useState} from "react";

export default function Presentation() {
    const [presentation, setPresentation] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Présentation</Text>


            <Text style={styles.label}>Saissisez votre présentation</Text>
            <TextInput
                style={styles.input}
                placeholder="Bonjour, je suis médecin généraliste à ..."
                placeholderTextColor="#A9A9A9"
                value={presentation}
                onChangeText={setPresentation}
            />


            <Button
                size={"medium"}
                styleType={"primary"}
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
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 2,
    },
});
