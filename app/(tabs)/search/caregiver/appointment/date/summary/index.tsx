import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Summary() {
  return (
    <>
      <Stack.Screen
        options={{
          title: ``,
          headerStyle: { backgroundColor: "#34659A" },
          headerTintColor: "white",
        }}
      />
      <View>
        <Text>Summary</Text>
      </View>
    </>
  );
}
