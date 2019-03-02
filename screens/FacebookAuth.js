import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure
} from "../redux/actions";

import { IP } from "../config";

class FacebookAuth extends Component {
  constructor(props) {
    super(props);
  }
  _handlePressAsync = async () => {
    // this.props.fetchUser();
    const appId = Expo.Constants.manifest.facebookAppId;
    const permissions = ["public_profile", "email"]; // Permissions required, consult Facebook docs

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId,
      { permissions }
    );

    switch (type) {
      case "success": {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential); // Sign in with Facebook credential

        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data

        let id = facebookProfileData.additionalUserInfo.profile.id;
        let name = facebookProfileData.additionalUserInfo.profile.name;
        let profilePic =
          facebookProfileData.additionalUserInfo.profile.picture.data.url;

        await fetch(`http://${IP}:4006/login-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, info: { userName: name }, hi: "hi again" })
        })
          .then(data =>
            this.props.fetchUserSuccess(JSON.parse(data._bodyInit)[0])
          )
          .catch(err => console.warn("error hitting 4006/login-user: ", err));
        // redirect to home
        return Promise.resolve({ type: "success" });
      }
      case "cancel": {
        return Promise.reject({ type: "cancel" });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="LOG IN" onPress={this._handlePressAsync} />
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

const connectedFacebookAuth = connect(
  mapStateToProps,
  mapActionsToProps
)(FacebookAuth);

export default connectedFacebookAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
