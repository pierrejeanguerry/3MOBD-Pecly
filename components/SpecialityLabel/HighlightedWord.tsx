import React from "react";
import { Text } from "react-native";
import styles from "./styles";

interface HighlightedWordProps {
  word: string;
  emphasis: string;
}
const HighlightedWord: React.FC<HighlightedWordProps> = ({
  word,
  emphasis,
}) => {
  const index = word.toLowerCase().indexOf(emphasis.toLowerCase());
  if (index === -1) {
    return <Text style={styles.normal}>{word}</Text>;
  }

  const before = word.substring(0, index);
  const highlighted = word.substring(index, index + emphasis.length);
  const after = word.substring(index + emphasis.length);

  return (
    <Text>
      <Text style={styles.normal}>{before}</Text>
      <Text style={styles.emphasis}>{highlighted}</Text>
      <Text style={styles.normal}>{after}</Text>
    </Text>
  );
};

export default HighlightedWord;
