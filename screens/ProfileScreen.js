import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import Icon from "@expo/vector-icons/Ionicons";
import firebase from "firebase";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";
import NewReviewForm from "../components/NewReviewForm";
import colors from '../styles/colors';


class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE",
    headerTintColor: colors.midgrey,
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 3,
    }
  };

  render() {
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
          <Button
            title="Log Out"
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(response => {
                  this.props.navigation.navigate("UserAuth");
                })
                .catch(error => {
                  console.log(error);
                  // An error happened
                })
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.userReducer.user.id,
    userName: state.userReducer.user.userProfile.userName,
    photo: state.userReducer.user.userProfile.profilePhoto
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
