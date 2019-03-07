import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import FavoriteScreen from "./FavoriteScreen";
import Map from "../components/Map/Map";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 40.758701,
        longitude: -111.876183,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: []
    };
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <View style={styles.container}>
          <Map region={this.state.region} markers={this.state.markers} />
        </View>

      </View>
    );
  }
}

// bottom nav bar
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Favorites: FavoriteScreen
});

// creates container component
const homeContainer = createAppContainer(TabNavigator);
export default homeContainer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
