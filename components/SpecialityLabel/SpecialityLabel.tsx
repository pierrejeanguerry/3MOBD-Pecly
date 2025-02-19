import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import HighlightedWord from "./HighlightedWord";
import styles from "./styles";
import { useRouter } from "expo-router";

interface SpecialityLabelProps {
  name: string;
  emphasis: string;
}

const SpecialityLabel: React.FC<SpecialityLabelProps> = ({
  name,
  emphasis,
}) => {
  const router = useRouter();
  const lowercaseName = name.toLowerCase();
  const lowercaseEmphasis = emphasis.toLocaleLowerCase();
  const words = lowercaseName.split(" ");
  const emphasisList = lowercaseEmphasis.split(" ");
  const param: string = name;

  function onPress() {
    router.push(`./search/${param}`);
  }

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View>
          {words.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <HighlightedWord word={word} emphasis={emphasisList} />
              {index < words.length - 1 && <Text style={styles.normal}> </Text>}
            </View>
          ))}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SpecialityLabel;
