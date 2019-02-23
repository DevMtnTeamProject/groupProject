import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import NewReviewForm from "../components/NewReviewForm";
import Icon from "@expo/vector-icons/Ionicons";

// TODO get user info from Redux,
class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("NewReviewForm")}
          title=" + Add a Review"
        />
      </View>
    );
  }
}

const ProfileStackNavigator = createStackNavigator({
  Profile: ProfileScreen,
  NewReviewForm: NewReviewForm
});

export default ProfileStackNavigator;
