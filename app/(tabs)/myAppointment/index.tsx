import {View, Text, StyleSheet, TouchableOpacity, Animated} from "react-native";
import {useState, useRef} from 'react';
import styles from './styles'

export default function myAppointmentScreen() {
    const [passed, setPassed] = useState(false);
    const underlinePosition = useRef(new Animated.Value(0)).current;

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
    return <Text>Future</Text>
}

function NotPassedAppointment() {
    return <Text>Non Passée</Text>
}

