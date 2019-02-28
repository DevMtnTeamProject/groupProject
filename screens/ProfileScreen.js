import React, { Component } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";


class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
  };
  render() {
    console.log(this.props.userInfo)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen </Text>
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
  Profile: connectedProfileScreen
});

export default ProfileStackNavigator;
