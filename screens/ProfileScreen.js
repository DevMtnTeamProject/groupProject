import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import Icon from "@expo/vector-icons/Ionicons";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";
import NewReviewForm from "../components/NewReviewForm";

class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
  };

  render() {
    console.log("this.props.userName", this.props.userName);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            alignItems: "center"
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 100 / 2
            }}
            source={{ uri: this.props.photo }}
          />
          <Text style={{ fontWeight: "700", fontSize: 16, marginTop: 10 }}>
            {this.props.userName}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewReview")}
            style={{
              width: 200,
              flexDirection: "row",
              fontSize: 12,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="ios-add" size={24} />
            <Text style={{ marginLeft: 7 }}>Write A Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.userReducer.user.id,
    userName: state.userReducer.user.userName,
    photo: state.userReducer.user.profilePhoto
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
  NewReview: NewReviewForm
});

export default ProfileStackNavigator;
