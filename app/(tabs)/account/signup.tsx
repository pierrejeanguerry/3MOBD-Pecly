import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import Button from "../../../components/Button/Button";

function onPress(): void {
}


export default function Signup() {
    const [gender, setGender] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Créer un compte</Text>

            <Text style={styles.label}>Saisissez votre adresse email</Text>
            <TextInput style={styles.input} placeholder="pierre-jean.guerry@ecole-hexagone.com" placeholderTextColor="#A9A9A9"
                       keyboardType="email-address"/>

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} placeholder="mot de passe..." placeholderTextColor="#A9A9A9" secureTextEntry={true}/>
            <Text style={styles.label}>Sexe à l’état civil</Text>
            <View style={styles.genderContainer}>
                <TouchableOpacity
                    style={[styles.genderButton, gender === "Féminin" && styles.genderButtonSelected]}
                    onPress={() => setGender("Féminin")}
                >
                    <Text style={styles.genderText}>Féminin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderButton, gender === "Masculin" && styles.genderButtonSelected]}
                    onPress={() => setGender("Masculin")}
                >
                    <Text style={styles.genderText}>Masculin</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nom et Prénom</Text>
            <View style={styles.nameContainer}>
                <TextInput style={[styles.input, styles.nameInput]} placeholder="Nom..." placeholderTextColor="#A9A9A9"/>
                <TextInput style={[styles.input, styles.nameInput]} placeholder="Prénom..." placeholderTextColor="#A9A9A9"/>
            </View>

            <Text style={styles.label}>Date de naissance</Text>
            <TextInput style={styles.input} placeholder="jj/mm/aaaa" placeholderTextColor="#A9A9A9" keyboardType="numeric"/>

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput style={styles.input} placeholder="06 00 00 00 00" placeholderTextColor="#A9A9A9" keyboardType="phone-pad"/>

            <Button size={"large"} styleType={"primary"} onPress={() => onPress}>Créer un compte</Button>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        color: "#333",
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
    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    genderButton: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 2,
    },
    genderButtonSelected: {
        backgroundColor: "#007BFF",
    },
    genderText: {
        fontSize: 14,
        color: "#333",
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    nameInput: {
        flex: 1,
        marginHorizontal: 5,
    },

});
