import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import NewReviewForm from "./components/NewReviewForm";
import HomeScreen from "./views/HomeScreen";
import FavoriteScreen from "./views/FavoriteScreen";

// createStackNavigator is like <Route /> in Reactjs
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Favorites: FavoriteScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});
