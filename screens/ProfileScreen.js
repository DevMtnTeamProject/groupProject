import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import NewReviewForm from "../components/NewReviewForm";
import Icon from "@expo/vector-icons/Ionicons";
import { Provider, connect } from "react-redux";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";

// TODO get user info from Redux,
class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
  };
  render() {
    console.log(this.props.userInfo);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("NewReviewForm")}
          title=" + Add a Review"
        />
        <Text>Hello, {this.props.userInfo.info.userName}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user
  };
};

const mapActionsToProps = {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
};

const connectedProfileScreen = connect(
  mapStateToProps,
  mapActionsToProps
)(ProfileScreen);

const ProfileStackNavigator = createStackNavigator({
  Profile: connectedProfileScreen,
  NewReviewForm: NewReviewForm
});

export default ProfileStackNavigator;
