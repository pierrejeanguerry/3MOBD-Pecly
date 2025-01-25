import React from "react";
import { Text } from "react-native";
import styles from "./styles";

interface HighlightedWordProps {
  word: string;
  emphasis: string[];
}
const HighlightedWord: React.FC<HighlightedWordProps> = ({
  word,
  emphasis,
}) => {
  let currentWord = word;
  const parts = [];

  emphasis.forEach((em) => {
    const index = currentWord.toLowerCase().indexOf(em.toLowerCase());
    if (index !== -1) {
      const before = currentWord.substring(0, index);
      const highlighted = currentWord.substring(index, index + em.length);
      const after = currentWord.substring(index + em.length);

      parts.push(
        <Text style={styles.normal} key={`before-${em}`}>
          {before}
        </Text>
      );
      parts.push(
        <Text style={styles.emphasis} key={`highlighted-${em}`}>
          {highlighted}
        </Text>
      );
      currentWord = after;
    }
  });

  parts.push(
    <Text style={styles.normal} key="remaining">
      {currentWord}
    </Text>
  );

  return <Text>{parts}</Text>;
};

export default HighlightedWord;
