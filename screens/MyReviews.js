import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";

class MyReviews extends Component {
  static navigationOptions = {
    headerTitle: "MYREVIEWS"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>My Reviews</Text>
      </View>
    );
  }
}

export default MyReviews;
