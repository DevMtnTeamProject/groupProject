import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserLocation } from "../redux/actions";
import { SafeAreaView, View, Platform } from "react-native";

import { Constants, Location, Permissions } from "expo";
import colors from '../styles/colors'

import { createStackNavigator } from "react-navigation";
import Map from "../components/Map/Map";
import MarkerDetailsScreen from "./MarkerDetailsScreen";
import SearchBar from "../components/SearchBar/SearchBar";
import { googleApiKey } from "../config";

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

  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
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
      this.getUserLocation();
    }
  };

  getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});

    let LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    this.props.fetchUserLocation(LatLng);
    console.log("this.props.userLocation", this.props.userLocation);
  };

  render() {
    console.log("this is props userLocation", this.props.userLocation);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Map />
        <View>
          <SearchBar userLatLng={this.props.userLocation} />
        </View>
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
