import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Map from "../components/Map/Map";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 40.758701,
        longitude: -111.876183,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: []
    };
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <View style={styles.container}>
          <MapView
            region={this.state.region}
            style={styles.map}
            showUserLocation={true}
            provider={PROVIDER_GOOGLE}
          >
            {this.state.markers.map(marker => (
              <Marker
              // coordinate={marker.latlng}
              // title={marker.title}
              // description={marker.description}
              />
            ))}
          </MapView>
        </View>
        <Button
          title="View Favorites"
          onPress={() => this.props.navigation.navigate("Favorites")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
