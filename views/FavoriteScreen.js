import React from "react";
import { View, Text } from "react-native";
import ReviewCard from "../components/ReviewCard/ReviewCard"


export default class FavoriteScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View ><ReviewCard /></View>
      </View>
    );
  }
}
