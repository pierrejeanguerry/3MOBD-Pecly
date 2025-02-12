import {View, Text, StyleSheet, TextInput} from "react-native";
import Button from "../../../../components/Button/Button";
import {Link, useRouter} from "expo-router";
import {usePreferences} from "@/hooks/usePreferences";
import React, {useEffect, useState} from "react";


export default function Adresse() {
    const { adresse } = usePreferences();
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");

    const handleAdresse = async (
        country: string,
        city: string,
        postalCode: string,
        street: string,
    ) => {
        try {
            await adresse(country, city, postalCode, street);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Adresse</Text>


            <View style={styles.adresseContainer}>
                <TextInput
                    style={[styles.input, styles.adresseInput]}
                    placeholder="Pays..."
                    placeholderTextColor="#A9A9A9"
                    value={country}
                    onChangeText={setCountry}
                />

                <TextInput
                    style={[styles.input, styles.adresseInput]}
                    placeholder="Ville..."
                    placeholderTextColor="#A9A9A9"
                    value={city}
                    onChangeText={setCity}
                />
            </View>

            <View style={styles.adresseContainer}>
                <TextInput
                    style={[styles.input, styles.adresseInput]}
                    placeholder="Code postal..."
                    placeholderTextColor="#A9A9A9"
                    value={postalCode}
                    onChangeText={setPostalCode}
                />

                <TextInput
                    style={[styles.input, styles.adresseInput]}
                    placeholder="Rue..."
                    placeholderTextColor="#A9A9A9"
                    value={street}
                    onChangeText={setStreet}
                />
            </View>

            <Button
                size={"medium"}
                styleType={"primary"}
                onPress={() =>
                    handleAdresse(country, city, postalCode, street)
                }            >
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
    input: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom: 10,
        fontSize: 14,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 2,
    },
    adresseContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 15,
    },
    adresseInput: {
        flex: 1,
        marginHorizontal: 5,
    },
});
