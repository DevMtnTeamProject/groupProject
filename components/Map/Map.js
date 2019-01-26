import React, { Component } from "react";
import { StyleSheet } from "react-native";
import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// functionality of map
/*
view reviewed restaurant pins on map
view favorite restaurant pins on map
on pin click, expand view to see restaurant info
search for restaurant
initial location rendered === user location


*/
//ajksdlf;jaf/
export default class Map extends Component {

  render() {
    // console.log('hhhhh', mapstyles)
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
