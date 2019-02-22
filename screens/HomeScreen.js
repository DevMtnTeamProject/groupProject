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
import Icon from "@expo/vector-icons/Ionicons";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyles from "../components/Map/mapstyles.json";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import FavoriteStackNavigator from "./FavoriteScreen";
import ProfileStackNavigator from "./ProfileScreen";
import MarkerDetailsScreen from "./MarkerDetailsScreen";

import { googleApiKey } from "../config";
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
    }
  };
  onRegionChange = region => {
    this.setState({ region });
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
    const nearby_api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=2000&types=restaurant&rankedby=distance&key=${googleApiKey}`;

    try {
      const nearbyResults = await fetch(nearby_api_url);
      const json = await nearbyResults.json();
      const restaurantArr = json.results.map(r => ({
        place_id: r.place_id,
        latLng: {
          latitude: r.geometry.location.lat,
          longitude: r.geometry.location.lng
        },
        name: r.name,
        address: r.vicinity
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

    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}
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
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    };
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          style={styles.map}
          customMapStyle={mapstyles}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onRegionChange={this._getLocationAsync}
        >
          {!!this.state.nearbyRestaurants &&
            !!this.state.nearbyRestaurants.length &&
            this.state.nearbyRestaurants.map(r => (
              <Marker
                key={r.place_id}
                coordinate={r.latLng}
                title={r.name}
                description={r.address}
              />
            ))}
        </MapView>
        <React.Fragment>
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
const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Favorites: FavoriteStackNavigator,
    Profile: ProfileStackNavigator
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);
const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator
    },
    Details: {
      screen: MarkerDetailsScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

export default HomeStackNavigator;

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
