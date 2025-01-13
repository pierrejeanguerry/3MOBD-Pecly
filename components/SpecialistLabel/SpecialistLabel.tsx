import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SpecialistLabelProps {
  name: string;
  city: string;
  speciality: string;
  icon: string;
}

const SpecialistLabel: React.FC<SpecialistLabelProps> = ({
  name,
  city,
  speciality,
  icon,
}) => {
  const onPress = () => {
    // call to api
    // change screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <>
        {icon ? (
          <Image src={icon} style={styles.icon} />
        ) : (
          <FontAwesome size={45} name="user" style={styles.icon} />
        )}
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{speciality}</Text>
          <Text style={styles.text}>{city}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 100,
    width: 45,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  text: {
    fontSize: 15,
  },
});

export default SpecialistLabel;
