import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LabelType } from "./Specialist.types";
import { useRouter } from "expo-router";
import { useNextAvailability } from "@/hooks/useNextAvailability";
import { User } from "@/types/user";

interface SpecialistLabelProps {
  item: User;
  type: LabelType;
}

interface SpecialistLabelChildProps {
  item: User;
  onPress: () => void;
}

const SpecialistLabel: React.FC<SpecialistLabelProps> = ({ item, type }) => {
  const router = useRouter();
  const onPress = () => {
    router.push(`/(tabs)/home/search/caregiver/${item.id}`);
  };

  return (
    <>
      {type === "summarized" && (
        <SpecialistLabelSummarized item={item} onPress={onPress} />
      )}
      {type === "detailled" && (
        <SpecialistLabelDetailled item={item} onPress={onPress} />
      )}
    </>
  );
};

const SpecialistLabelSummarized: React.FC<SpecialistLabelChildProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.summarized]}
      onPress={onPress}
    >
      <>
        <FontAwesome size={45} name="user" style={styles.icon} />
        <View>
          {item.name ? (
            <Text style={styles.text}>{item.name}</Text>
          ) : (
            <Text style={styles.text}>
              {item.firstname} {item.lastname}
            </Text>
          )}
          <Text style={styles.text}>{item.caregiverDetails?.speciality}</Text>
          <Text style={styles.text}>{item.address?.city}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const SpecialistLabelDetailled: React.FC<SpecialistLabelChildProps> = ({
  item,
  onPress,
}) => {
  const { availability, loading, error } = useNextAvailability(item.id);
  return (
    <View style={styles.list}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={styles.list}>
            <>
              <FontAwesome size={45} name="user" style={styles.icon} />

              <View>
                {item.name ? (
                  <Text style={styles.text}>{item.name}</Text>
                ) : (
                  <Text style={styles.text}>
                    {item.firstname} {item.lastname}
                  </Text>
                )}
                <Text style={styles.text}>
                  {item.caregiverDetails?.speciality}
                </Text>
                <Text style={styles.text}>{item.address?.street},</Text>
                <Text style={styles.text}>
                  {item.address?.postalCode} {item.address?.city}
                </Text>
              </View>
            </>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        {loading ? (
          <Text>Chargement...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : availability ? (
          <>
            <Text>Prochaine disponibilité :</Text>
            <Text style={styles.date}>{availability}</Text>
          </>
        ) : (
          <Text>Aucune disponibilité trouvée.</Text>
        )}
      </View>
    </View>
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
  summarized: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
  },
  left: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    padding: 2,
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderLeftColor: "black",
    borderStyle: "solid",
    borderLeftWidth: 1,
    padding: 2,
  },
  date: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SpecialistLabel;
