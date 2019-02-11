import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button
} from "react-native";
import { Constants, Location, Permissions } from "expo";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyles from "../components/Map/mapstyles.json";

// import { Map } from "../components/Map/Map";
import { apiKey } from "../components/Map/key";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import FavoriteScreen from "./FavoriteScreen";

// TODO add permissions for user location

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      markers: [],
      destination: "",
      nearbyRestaurants: [],
      predictions: []
    };
  }

  // TODO

  // in componentDidMount:
  // google places api call to get nearby restaurants and render those results as markers on map
  // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=&radus=
  // function for rendering reviewed restaurants on the map

  // make predictions pressable and that then renders a marker on the map with details
  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log("error", "error");
    } else {
      this._getUserLocationPermission().catch(err => console.log("error", err));
    }
  }

  _getUserLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("error getting location permission", error);
    } else {
      this._getLocationAsync();
      // if (userLocation.status === 200)
      // (this.getRestaurantsNearby());
    }
  };

  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      userLatitude: location.coords.latitude,
      userLongitude: location.coords.longitude
    });
    !!location && this.getRestaurantsNearby();
  };

  getRestaurantsNearby = async () => {
    const { userLatitude, userLongitude } = this.state;
    const nearby_api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=2000&key=${apiKey}`;

    try {
      const nearbyResults = await fetch(nearby_api_url);
      const json = await nearbyResults.json();
      const restaurantArr = json.results.map(r => ({
        latLng: {
          latitude: r.geometry.location.lat,
          longitude: r.geometry.location.lng
        },
        name: r.name
      }));
      this.setState({ nearbyRestaurants: restaurantArr });
    } catch (err) {
      console.error(err);
    }
  };

  //  search by text
  onDestinationSearch = async destination => {
    const { userLatitude, userLongitude } = this.state;

    this.setState({ destination });

    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
    &input=${destination}&location=${userLatitude},${userLongitude}&radius=2000`;

    try {
      const result = await fetch(place_search_url);
      const json = await result.json();
      console.log("these are the prediction results", json.predictions);
      this.setState({ predictions: json.predictions });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const predictions = this.state.predictions.map(prediction => {
      return (
        <ScrollView>
          <Text key={prediction.id}>{prediction.description}</Text>
        </ScrollView>
      );
    });
    const region = {
      latitude: this.state.userLatitude,
      longitude: this.state.userLongitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2
    };
    console.log("this is state", this.state);
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          mapType={"standard"}
          style={styles.map}
          // customMapStyle={mapstyles}
          // provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onRegionChange={this._getLocationAsync}
        >
          {!!this.state.nearbyRestaurants &&
            !!this.state.nearbyRestaurants.length &&
            this.state.nearbyRestaurants.map(r => (
              <Marker
                coordinate={r.latLng}
                title={r.name}
                description={"description"}
              />
            ))}
        </MapView>
        <React.Fragment>
          <Button
            title="get nearby restaurants"
            onPress={() => this.getRestaurantsNearby()}
          />
          <TextInput
            placeholder="Search for a restaurant"
            style={styles.textInput}
            value={this.state.searchString}
            onChangeText={destination => this.onDestinationSearch(destination)}
          />
          {predictions}
        </React.Fragment>
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
    // height: 400,
    // width: 400,
    justifyContent: "flex-start",
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
    position: "absolute",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    minWidth: 350,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "white"
  }
});
