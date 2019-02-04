require("dotenv").config();
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const IOS_API_KEY = process.env.GOOGLE_API_KEY_IOS;
const ANDROID_API_KEY = process.env.GOOGLE_API_KEY_ANDROID;

// TODO functionality of map
/*
view reviewed restaurant pins on map
view favorite restaurant pins on map
on pin click, expand view to see restaurant info
search for restaurants
initial location rendered === user location


*/
export default class Map extends Component {
  render() {
    return (
      <MapView
        region={this.props.region}
        style={styles.map}
        customMapStyle={mapstyles}
        showUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {this.props.markers.map(marker => (
          <Marker
          // coordinate={marker.latlng}
          // title={marker.title}
          // description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
