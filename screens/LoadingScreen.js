import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        const { uid, displayName, photoURL } = user;
        const userProfile = {
          id: uid,
          userName: displayName,
          profilePhoto: photoURL
        };
        this.props.fetchUserSuccess(userProfile);
        console.log("this is state", this.props.user);
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("UserAuth");
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.userReducer.isFetching,
    user: state.userReducer.user
  };
};

const mapActionsToProps = {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
};

const connectedLoadingScreen = connect(
  mapStateToProps,
  mapActionsToProps
)(LoadingScreen);

export default connectedLoadingScreen;
