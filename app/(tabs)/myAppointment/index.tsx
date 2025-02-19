import {View, Text, TouchableOpacity, Animated, StatusBar, FlatList, StyleSheet} from "react-native";
import {useState, useRef, useEffect} from 'react';
import styles from './styles'
import firestore from "@react-native-firebase/firestore";
import {useAuth} from "@/hooks/useAuth";

import Login from '../account/login'

export default function MyAppointmentScreen() {
    const [passed, setPassed] = useState(false);
    const underlinePosition = useRef(new Animated.Value(0)).current;
    const {user} = useAuth();

    if (!user) {
        return <Login />
    }

    const handleSwitch = (isPassed: boolean) => {
        setPassed(isPassed);
        Animated.timing(underlinePosition, {
            toValue: isPassed ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };


    return (
        <View style={styles.pageContainer}>
            <StatusBar backgroundColor='rgb(46,116,191)'/>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>Mes rendez-vous</Text>
            </View>
            <View style={styles.tabsContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => handleSwitch(false)}>
                    <Text>A venir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => handleSwitch(true)}>
                    <Text>Passées</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.underlineWrapper}>
                <Animated.View
                    style={[
                        styles.underline,
                        {
                            left: underlinePosition.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '50%'],
                            }),
                        },
                    ]}
                />
            </View>
            {passed ? (
                <NotPassedAppointment/>
            ) : (
                <FutureAppointment/>
            )}
        </View>
    );
}

function FutureAppointment() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

    }, [])

    return <Text>Future</Text>
}

function NotPassedAppointment() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const getAppointments = async () => {
            const querySnapshot = await firestore()
                .collection("Appointments")
                .where("patientId", "==", user?.id)
                .get();

            let tempAppointment: any[] = [];

            for (const element of querySnapshot.docs) {
                const data = element.data();
                const caregiverSnap = await firestore().doc(`Users/${data.caregiverId}`).get();
                const caregiver = caregiverSnap.data();
                tempAppointment.push({ appointment: data, caregiver: caregiver });
            }
            setAppointments(tempAppointment);
        };
        getAppointments().then(null);
    }, []);

    const formatDate = (timestamp: any) => {
        const date = timestamp.toDate();
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <View style={unique.container}>
            <FlatList
                data={appointments}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={unique.card}>
                        <Text style={unique.motive}>Motif: {item.appointment.motive}</Text>
                        <Text style={unique.caregiver}>Soignant: {item.caregiver.firstname} {item.caregiver.lastname}</Text>
                        <Text style={unique.date}>Date: {formatDate(item.appointment.dateTime)}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const unique = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    motive: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    caregiver: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: "#888",
    },
});
