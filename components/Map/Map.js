import React from "react";
import { StyleSheet } from "react-native";
import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const Map = ({ region, markers }) => {
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      customMapStyle={mapstyles}
      showUserLocation
      followsUserLocation={true}
      provider={PROVIDER_GOOGLE}
    >
      {markers &&
        markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
    </MapView>
  );
};

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
  },
  textInput: {
    height: 40,
    width: 400,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "white"
  }
});
