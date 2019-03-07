import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserLocation, fetchNearbyRestaurants } from "../../redux/actions";

import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Button
} from "react-native";

import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SearchBar from "../SearchBar/SearchBar";
import { googleApiKey } from "../../config";

// Render markers, change view to area user is searching
const { width, height } = Dimensions.get("window");
const LAT_DELTA = 0.0922;
const LNG_DELTA = LAT_DELTA * (width / height);

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      region: {},
      location: {},
      isNearbyVisible: false
    };
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  // gets nearby restaurants from userLocation
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
      this.props.fetchNearbyRestaurants(restaurantArr);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {!!this.props.userLocation.latitude && (
          <MapView
            initialRegion={{
              latitude: this.props.userLocation.latitude,
              longitude: this.props.userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            style={styles.map}
            customMapStyle={mapstyles}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            userLocationAnnotationTitle="My Location"
            onRegionChange={this.onRegionChange}
            zoomEnabled={true}
            scrollEnabled={true}
            loadingEnabled={true}
            onMapReady={this.getUserLocation}
          >
            {!!this.props.nearbyRestaurants &&
              !!this.props.nearbyRestaurants.length &&
              this.props.nearbyRestaurants.map(r => (
                <Marker
                  key={r.place_id}
                  coordinate={r.latLng}
                  title={r.name}
                  description={r.address}
                />
              ))}
          </MapView>
        )}

        <View>
          <SearchBar userLatLng={this.props.userLocation} />
          <View>
            <Button
              title="Nearby Restaurants"
              onPress={this.getRestaurantsNearby}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.mapReducer.userLatLng,
    nearbyRestaurants: state.mapReducer.nearbyRestaurants
  };
};
const mapActionsToProps = {
  fetchUserLocation,
  fetchNearbyRestaurants
};

const connectedMap = connect(
  mapStateToProps,
  mapActionsToProps
)(Map);

export default connectedMap;

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
  }
});
