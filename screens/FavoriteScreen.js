import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
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
      <ScrollView style={styles.container}>
        {/* <Text></Text> */}
        <ReviewCard />

      </ScrollView>
    );
  }
}



const FavoriteStackNavigator = createStackNavigator({
  Favorites: FavoriteScreen
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: colors.eggshell,
    padding: 10,


  },
});

export default FavoriteStackNavigator;
