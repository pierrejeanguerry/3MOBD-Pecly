import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "../../../components/Button/Button";
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";



export default function Account() {
    const {logout, user} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("../account/");
    }

    return (
        <View style={styles.container}>

            <View style={styles.profileSection}>

                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.info}>Date de naissance</Text>
            </View>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>Mes préférences</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}> <Link href={"/(tabs)/account/infos"}>Informations
                        légales </Link>
                    </Text>
                </TouchableOpacity>
            </View>

            <Button size={"medium"} styleType={"danger"} onPress={handleLogout}>Se déconnecter</Button>


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
    profileSection: {
        backgroundColor: "#3B74F2",
        alignItems: "center",
        padding: 30,
        borderRadius: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: 15,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    info: {
        fontSize: 14,
        color: "#D9E6FF",
        marginTop: 5,
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
