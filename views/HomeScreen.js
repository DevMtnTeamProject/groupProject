import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import { Map } from "../components/Map/Map";
import { GOOGLE_API_KEY } from "../ignoreThis";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import FavoriteScreen from "./FavoriteScreen";

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
      destination: "",
      predictions: []
    };
  }
  onRegionChange = region => {
    this.setState({ region });
  };

  // Restaurant Search - google places api
  async onDestinationSearch(destination) {
    this.setState({ destination });

    const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}
    &input=${destination}&location=${this.state.latitude},${
      this.state.longitude
      }&radius=2000`;

    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      this.setState({ predictions: json.predictions });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const predictions = this.state.predictions.map(prediction => (
      <Text key={prediction.id}>{prediction.description}</Text>
    ));

    return (
      <View style={styles.container}>
        <Map region={this.state.region} />
        <TextInput
          placeholder="Search for a restaurant"
          style={styles.textInput}
          value={this.state.searchString}
          onChangeText={destination => this.onDestinationSearch(destination)}
        />
        {predictions}
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
  textInput: {
    height: 40,
    width: 400,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "white"
  }
});
