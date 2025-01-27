import React from "react";
import { Text, View } from "react-native";
import HighlightedWord from "./HighlightedWord";
import styles from "./styles";
import { Link } from "expo-router";

interface SpecialityLabelProps {
  name: string;
  emphasis: string;
}

const SpecialityLabel: React.FC<SpecialityLabelProps> = ({
  name,
  emphasis,
}) => {
  const lowercaseName = name.toLowerCase();
  const lowercaseEmphasis = emphasis.toLocaleLowerCase();
  const words = lowercaseName.split(" ");
  const emphasisList = lowercaseEmphasis.split(" ");
  const param: string = name;
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/(tabs)/search/[speciality]",
          params: { speciality: param },
        }}
      >
        <>
          {words.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <HighlightedWord word={word} emphasis={emphasisList} />
              {index < words.length - 1 && <Text style={styles.normal}> </Text>}
            </View>
          ))}
        </>
      </Link>
    </View>
  );
};

export default SpecialityLabel;
