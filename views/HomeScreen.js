import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Map from "../components/Map/Map";

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
          <Map region={this.state.region} markers={this.state.markers} />
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
