import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
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
  const lowercaseEmphasis = emphasis.toLocaleLowerCase();
  const emphasisList = lowercaseEmphasis.split(" ");
  const param: string = name;

  function onPress() {
    router.push(`./search/${param}`);
  }

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.wordContainer}>
          <HighlightedWord word={name} emphasis={emphasisList} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SpecialityLabel;
