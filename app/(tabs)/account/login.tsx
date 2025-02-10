import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import Button from "../../../components/Button/Button";
import auth from "@react-native-firebase/auth";

function onPress(): void {
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            alert("connecté");
        } catch (error: any) {
            setError(error?.message || "erreur");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Se connecter</Text>

            <Text style={styles.label}>Adresse e-mail</Text>
            <TextInput style={styles.input} placeholder="Adresse e-mail"
                       placeholderTextColor="#A9A9A9"
                       keyboardType="email-address"
                       value={email}
                       onChangeText={setEmail}/>

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} placeholder="Mot de passe..." placeholderTextColor="#A9A9A9"
                       secureTextEntry={true}
                       value={password}
                       onChangeText={setPassword}/>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <Button size={"large"} styleType={"primary"} onPress={(handleLogin)}>Créer un compte</Button>


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


});
