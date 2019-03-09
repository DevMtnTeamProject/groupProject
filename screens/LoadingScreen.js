import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { IP } from "../config";
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
    firebase.auth().onAuthStateChanged(async user => {
      console.log(user);
      if (user !== null) {
        console.log("user.providerData[0]", user.providerData[0]);
        const { uid, displayName, photoURL } = user.providerData[0];
        const userProfile = {
          id: uid,
          userName: displayName,
          profilePhoto: photoURL
        };
        await fetch(`http://${IP}:4006/login-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid,
            info: { userName: displayName },
            hi: "hi again"
          })
        })
          .then(data => {
            console.log(data._bodyInit);
            this.props.fetchUserSuccess({
              userProfile,
              ...JSON.parse(data._bodyInit)[0]
            });
            this.props.navigation.navigate("Home");
          })
          .catch(err => console.warn("error hitting 4006/login-user: ", err));
        // redirect to home
        this.props.navigation.navigate("Home");
        return Promise.resolve({ type: "success" });
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
