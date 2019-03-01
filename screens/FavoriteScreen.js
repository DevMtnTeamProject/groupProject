import React, { Component } from "react";
import { View, Text } from "react-native";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { createStackNavigator } from "react-navigation";
import colors from '../styles/colors';

class FavoriteScreen extends Component {
  static navigationOptions = {
    headerTitle: "FAVORITES",
    headerTintColor: colors.midgrey,
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 3,
    }

  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text></Text>
        <ReviewCard />
      </View>
    );
  }
}

const FavoriteStackNavigator = createStackNavigator({
  Favorites: FavoriteScreen
});

export default FavoriteStackNavigator;
