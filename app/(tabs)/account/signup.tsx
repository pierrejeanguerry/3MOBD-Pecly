import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import Button from "../../../components/Button/Button";
import DatePicker from 'react-native-date-picker'
import { useNavigation } from "@react-navigation/native";


function onPress(): void {
}


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState(new Date())

    /*const handleRegister = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            alert("Compte créé");
            const navigation = useNavigation();
            /*navigation.navigate("");
        } catch (error: any) {
            setError(error?.message || "erreur");
        }
    }; */

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Créer un compte</Text>

            <Text style={styles.label}>Saisissez votre adresse e-mail</Text>
            <TextInput style={styles.input} placeholder="adresse e-mail"
                       placeholderTextColor="#A9A9A9"
                       keyboardType="email-address"
                       value={email}
                       onChangeText={setEmail}/>

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} placeholder="mot de passe..." placeholderTextColor="#A9A9A9"
                       secureTextEntry={true}
                       value={password}
                       onChangeText={setPassword}/>

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
                <TextInput style={[styles.input, styles.nameInput]} placeholder="Nom..."
                           placeholderTextColor="#A9A9A9"/>
                <TextInput style={[styles.input, styles.nameInput]} placeholder="Prénom..."
                           placeholderTextColor="#A9A9A9"/>
            </View>

            <Text style={styles.label}>Date de naissance</Text>
            <DatePicker date={date} mode="date" onDateChange={setDate}/>


            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput style={styles.input} placeholder="06 00 00 00 00" placeholderTextColor="#A9A9A9"
                       keyboardType="phone-pad"/>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <Button size={"large"} styleType={"primary"} onPress={(handleRegister)}>Créer un compte</Button>


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
