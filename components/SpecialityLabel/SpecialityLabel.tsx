import React from "react";
import { Text, View } from "react-native";
import HighlightedWord from "./HighlightedWord";
import styles from "./styles";

interface SpecialityLabelProps {
  name: string;
  emphasis: string;
}

const SpecialityLabel: React.FC<SpecialityLabelProps> = ({
  name,
  emphasis,
}) => {
  const words = name.split(" ");

  return (
    <View style={styles.container}>
      {words.map((word, index) => (
        <View key={index} style={styles.wordContainer}>
          <HighlightedWord word={word} emphasis={emphasis} />
          {index < words.length - 1 && <Text style={styles.normal}> </Text>}
        </View>
      ))}
    </View>
  );
};

export default SpecialityLabel;
