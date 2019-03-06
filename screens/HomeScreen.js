import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserLocation } from "../redux/actions";
import {
  SafeAreaView,
  View,
  Platform,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { Constants, Location, Permissions } from "expo";
import colors from '../styles/colors'

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyles from "../components/Map/mapstyles.json";

import { createStackNavigator } from "react-navigation";
import MarkerDetailsScreen from "./MarkerDetailsScreen";
import SearchBar from "../components/SearchBar/SearchBar";
import { googleApiKey } from "../config";
<<<<<<< HEAD

// TODO add permissions for user location

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: "EXPLORE",
    headerTintColor: colors.midgrey,
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 3,
    }

=======

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
>>>>>>> c317cebd8a56dde02a6f763515af7ad1f4918fee
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      markers: [],
      nearbyRestaurants: [],
      googlePredictions: []
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
    const LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
    this.props.fetchUserLocation(LatLng);

    !!location && this.getRestaurantsNearby();
  };

  getRestaurantsNearby = async () => {
    const { latitude, longitude } = this.props.userLocation;
    const nearby_api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&types=restaurant&rankedby=distance&key=${googleApiKey}`;

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

  render() {
    const region = {
      latitude: this.props.userLocation.latitude,
      longitude: this.props.userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.09
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
        <SearchBar userLatLng={this.props.userLocation} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userLocation: state.mapReducer.userLatLng
  };
};
const mapActionsToProps = {
  fetchUserLocation
};

const connectedHomeScreen = connect(
  mapStateToProps,
  mapActionsToProps
)(HomeScreen);

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: connectedHomeScreen
  },
  Details: {
    screen: MarkerDetailsScreen
  }
});

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
