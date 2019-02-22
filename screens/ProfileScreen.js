import React, { Component } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation";

class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen </Text>
      </View>
    );
  }
}

const ProfileStackNavigator = createStackNavigator({
  Profile: ProfileScreen
});

export default ProfileStackNavigator;
