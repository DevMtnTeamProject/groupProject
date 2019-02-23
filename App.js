import React, { Component } from "react";
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { AuthSession } from "expo";
import Icon from "@expo/vector-icons/EvilIcons";

import store from "./store";
import { Provider, connect } from "react-redux";
import { fetchUser, fetchUserSuccess, fetchUserFailure } from "./redux/actions";
import firebase, { IP, facebookID } from "./config";

import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));

import { StyleSheet, View, Button, Text } from "react-native";
import HomeStackNavigator from "./screens/HomeScreen";
import ProfileStackNavigator from "./screens/ProfileScreen";
import FavoriteStackNavigator from "./screens/FavoriteScreen";

const FB_APP_ID = facebookID;

class FacebookAuth extends Component {
  _handlePressAsync = async () => {
    this.props.fetchUser();

    const appId = Expo.Constants.manifest.extra.facebook.appId;
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
    return this.props.user ? (
      this.props.navigation.navigate("Home")
    ) : (
      <View style={styles.container}>
        <Button title="LOG IN" onPress={this._handlePressAsync} />
        <Button
          title="HomeScreen"
          onPress={() => this.props.navigation.navigate("Home")}
        />
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

// ROUTES

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="search" color={tintColor} size={24} />;
        }
      }
    },
    Favorites: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        tabBarLabel: "FAVORITE",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="heart" color={tintColor} size={24} />;
        }
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: "PROFILE",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="user" color={tintColor} size={24} />;
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  UserAuth: connectedFacebookAuth,
  Home: AppTabNavigator
});
// Main App Nav
const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
