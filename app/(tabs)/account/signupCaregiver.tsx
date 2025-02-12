import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import Button from "../../../components/Button/Button";
import DatePicker from "react-native-date-picker";
import { useAuth } from "@/hooks/useAuth";

export default function SignupCaregiver() {
    const { user, register, login, CheckIsLogged } = useAuth();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [gender, setGender] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [date, setDate] = useState(new Date());
    const [phone, setPhone] = useState("");

    const handleRegister = async (
        email: string,
        pass: string,
        gender: string,
        lastName: string,
        firstName: string,
        date: Date,
        phone: string
    ) => {
        try {
            await register(email, pass, gender, lastName, firstName, date, phone);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Créer un compte soignant</Text>

            <Text style={styles.label}>Saisissez votre adresse e-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="adresse e-mail"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="mot de passe..."
                placeholderTextColor="#A9A9A9"
                secureTextEntry={true}
                value={pass}
                onChangeText={setPass}
            />


            <Text style={styles.label}>Nom et Prénom</Text>
            <View style={styles.nameContainer}>
                <TextInput
                    style={[styles.input, styles.nameInput]}
                    placeholder="Nom..."
                    placeholderTextColor="#A9A9A9"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    style={[styles.input, styles.nameInput]}
                    placeholder="Prénom..."
                    placeholderTextColor="#A9A9A9"
                    value={firstName}
                    onChangeText={setFirstName}
                />
            </View>

            <Text style={styles.label}>Date de naissance</Text>
            <DatePicker date={date} mode="date" onDateChange={setDate} />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
                style={styles.input}
                placeholder="06 00 00 00 00"
                placeholderTextColor="#A9A9A9"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <Text style={styles.label}>Saisissez votre numéro de CPS</Text>
            <TextInput
                style={styles.input}
                placeholder="adresse e-mail"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
            />

            <Button
                size={"large"}
                styleType={"primary"}
                onPress={() =>
                    handleRegister(email, pass, gender, lastName, firstName, date, phone)
                }
            >
                Créer un compte
            </Button>
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
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
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
