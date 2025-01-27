import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "../../../components/Button/Button";
import {Link} from "expo-router";

function onPress(): void {}

export default function Account() {
    return (
        <View style={styles.container}>

            <View style={styles.profileSection}>
                <View style={styles.avatar}>

                    <Image
                        style={styles.avatarImage}
                        source={{
                            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                        }}
                    />
                </View>

                <Text style={styles.name}>Title Firstname FAMILYNAME</Text>
                <Text style={styles.info}>Speciality</Text>
            </View>


            <View style={styles.privacySection}>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>Mes préférences</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privacyOption}>
                    <Text style={styles.privacyOptionText}>Informations légales</Text>
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
    profileSection: {
        backgroundColor: "#3B74F2",
        alignItems: "center",
        paddingVertical: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        marginTop: 30,
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
