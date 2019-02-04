import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
// import Callout from "react-native-maps";
import mapstyles from "../components/Map/mapstyles.json";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import FavoriteScreen from "./FavoriteScreen";
// import Map from "../components/Map/Map";

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
      markers: [],
      searchInput: ""
    };
  }
  onRegionChange = region => {
    this.setState({ region });
  };

  // handleSearchInput = e => {
  //   this.setState({ searchInput: e.target.value });
  // };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          style={styles.map}
          customMapStyle={mapstyles}
          showUserLocation={true}
          provider={PROVIDER_GOOGLE}
        />
        <TextInput
          id="place_search"
          placeholder={"Search"}
          style={styles.searchInput}
          // onChangeText={this.handleSearchInput}
        />
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
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  searchInput: {
    backgroundColor: "white",
    borderColor: "gray",
    height: 40,
    width: "100%",
    borderWidth: 1
  }
});
