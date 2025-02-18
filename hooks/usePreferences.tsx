import { useState, createContext, useContext, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    id: string;
    address?: {
        city?: string;
        country?: string;
        postalCode?: string;
        street?: string;
    };
    caregiverDetails?: {
        instruction?: string;
        licenseNumber?: string;
        motives?: string[];
        paymentMeans?: {
            card: boolean;
            cash: boolean;
            check: boolean;
        };
        presentation?: string;
        price?: {
            convention?: number;
            prices?: {
                price?: number;
                title?: string;
            }[];
            thirdParty?: string;
            vitalCard?: boolean;
        };
        speciality?: string;
    };
    contact?: {
        email?: string;
        phone?: string;
    };
    email: string;
    isCaregiver: boolean;
    lastname?: string;
    firstname?: string;
    password: string;
    gender: string;
}

interface AuthContextType {
    user: User | null;
    adresse: (
        country: string,
        city: string,
        postalCode: string,
        street: string,
    ) => Promise<void>;
    instructions: (
        instruction: string,
        motives: string,
    ) => Promise<void>;
    presentations: (
        presentation: string,
    ) => Promise<void>;
   /* payments: (
        paymentMeans: string,
    ) => Promise<void>;*/
}


export const usePreferences = ({ children }: { children: ReactNode }) => {


    const adresse = async (
        country: string,
        city: string,
        postalCode: string,
        street: string,
    ): Promise<void> => {
        try {
            const userRef = await firestore()
            .collection("users")
                .add({country: country, city: city, postalCode: postalCode, street: street});
            await saveAdresse({id: userRef.id, country: country, city: city, postalCode: postalCode, street: street});
            console.log("adresse enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };


    const saveAdresse = async (adresse: { id: string; country: string; city: string; postalCode: string; street: string }): Promise<void> => {
        try {
            await AsyncStorage.setItem("adresse", JSON.stringify(adresse));
            console.log("Adresse enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'adresse", error);
        }
    };

    const instructions = async (
        instruction: string,
        motives: string,
    ): Promise<void> => {
        try {
            const userRef = await firestore()
                .collection("users")
                .add({instruction: instruction, motives: motives});
            await saveInstructions({id: userRef.id, instruction: instruction, motives: motives});
            console.log("Instruction enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };


    const saveInstructions = async (adresse: { id: string; instruction: string; motives: string }): Promise<void> => {
        try {
            await AsyncStorage.setItem("instruction", JSON.stringify(instructions));
            console.log("Instruction enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'adresse", error);
        }
    };


    const presentations = async (
        presentation: string,
    ): Promise<void> => {
        try {
            const userRef = await firestore()
                .collection("users")
                .add({presentation: presentation});
            await savePresentations({id: userRef.id, presentation: presentation});
            console.log("Presentation enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };


    const savePresentations = async (adresse: { id: string; presentation: string}): Promise<void> => {
        try {
            await AsyncStorage.setItem("presentation", JSON.stringify(presentations));
            console.log("Instruction enregistrée");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'adresse", error);
        }
    };


    return { adresse, instructions, presentations }

};
