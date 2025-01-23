import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LabelType } from "./Specialist.types";
import { useRouter } from "expo-router";
import { useState } from "react";

interface SpecialistLabelProps {
  item: {
    id: string;
    name: string;
    city?: string | null;
    address?: string | null;
    speciality: string;
    icon: string;
  };
  type: LabelType;
}

interface SpecialistLabelSummarizedProps {
  item: {
    name: string;
    city?: string | null;
    speciality: string;
    icon: string;
  };
  onPress: () => void;
}

interface SpecialistLabelDetailledProps {
  item: {
    name: string;
    address?: string | null;
    speciality: string;
    icon: string;
  };
  onPress: () => void;
}

const SpecialistLabel: React.FC<SpecialistLabelProps> = ({ item, type }) => {
  const router = useRouter();
  const onPress = () => {
    // call to api
    // change screen
    console.log(item.id);

    router.navigate(`/(tabs)/search/caregiver/${item.id}`);
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

const SpecialistLabelSummarized: React.FC<SpecialistLabelSummarizedProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <>
        {item.icon ? (
          <Image source={{ uri: item.icon }} style={styles.icon} />
        ) : (
          <FontAwesome size={45} name="user" style={styles.icon} />
        )}
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.speciality}</Text>
          <Text style={styles.text}>{item.city}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const SpecialistLabelDetailled: React.FC<SpecialistLabelDetailledProps> = ({
  item,
  onPress,
}) => {
  return (
    <View style={styles.list}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={styles.list}>
            <>
              {item.icon ? (
                <Image source={{ uri: item.icon }} style={styles.icon} />
              ) : (
                <FontAwesome size={45} name="user" style={styles.icon} />
              )}
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.speciality}</Text>
                <Text style={styles.text}>{item.address}</Text>
              </View>
            </>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <Text>Disponibilité</Text>
        <Text>date</Text>
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
  text: {
    fontSize: 15,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  left: {
    width: 250,
  },
  right: {
    width: 100,
  },
});

export default SpecialistLabel;
