import React from "react";
import { View, Text, Button } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="View Favorites"
          onPress={() => this.props.navigation.navigate("Favorites")}
        />
      </View>
    );
  }
}
