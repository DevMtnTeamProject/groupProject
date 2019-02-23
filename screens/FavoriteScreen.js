import React, { Component } from "react";
import { View, Text } from "react-native";
import ReviewCard from "../components/Review Card/ReviewCard";
import { createStackNavigator } from "react-navigation";

class FavoriteScreen extends Component {
  static navigationOptions = {
    headerTitle: "FAVORITES"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Favorites Screen</Text>
        <ReviewCard />
      </View>
    );
  }
}

const FavoriteStackNavigator = createStackNavigator({
  Favorites: FavoriteScreen
});

export default FavoriteStackNavigator;
