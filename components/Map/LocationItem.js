import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LocationItem = ({ location }) => {
  return (
    <View style={styles.root}>
      <Text>{location.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});
