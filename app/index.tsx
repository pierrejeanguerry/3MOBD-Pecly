import Button from "@/components/Button";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Button
        size="long"
        styleType="primary"
        onPress={() => alert("Long Button Pressed")}
      >
        J'AI LU ET J'ACCEPTE LA CONSIGNE
      </Button>
      <Button
        size="large"
        styleType="danger"
        onPress={() => alert("Large Button Pressed")}
      >
        Je suis un patient
      </Button>
      <Button
        size="medium"
        styleType="default"
        onPress={() => alert("Medium Button Pressed")}
      >
        Connexion
      </Button>
      <Button
        size="small"
        styleType="empty"
        onPress={() => alert("Small Button Pressed")}
      >
        OUI
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
