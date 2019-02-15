import React from "react";
import { View, Text } from "react-native";
import ReviewCard from '../components/Review Card/ReviewCard'

export default class FavoriteScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Favorites Screen</Text>
        <ReviewCard />
      </View>
    );
  }
}
