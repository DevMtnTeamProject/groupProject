import React from "react";
import { StyleSheet } from "react-native";
import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GOOGLE_API_KEY } from "../../ignoreThis";

export const Map = ({ region, markers }) => {
  return (
    <MapView
      region={region}
      style={styles.map}
      customMapStyle={mapstyles}
      showUserLocation={true}
      provider={PROVIDER_GOOGLE}
    >
      {markers && markers.map(marker => <Marker />)}
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
