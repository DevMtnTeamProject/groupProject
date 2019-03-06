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
import MyReviews from "./MyReviews";

class ProfileScreen extends Component {
  static navigationOptions = {
    headerTitle: "PROFILE"
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("MyReviews")}
            style={{
              width: 200,
              flexDirection: "row",
              fontSize: 12,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="ios-add" size={24} />
            <MyReviews />
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
  NewReview: NewReviewForm,
  MyReviews: MyReviews
});

export default ProfileStackNavigator;
