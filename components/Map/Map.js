import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

// functionality of map
/*
view reviewed restaurant pins on map
view favorite restaurant pins on map
on pin click, expand view to see restaurant info
search for restaurant
initial location rendered === user location


*/
export default class Map extends Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showUserLocation={true}
        region={{
          latitude: 40.758701,
          longitude: -111.876183,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
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
