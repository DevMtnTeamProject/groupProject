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
import { IP, facebookID } from "./config";

import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));

import { StyleSheet, View, Button, Text } from "react-native";
import HomeStackNavigator from "./screens/HomeScreen";
import ProfileStackNavigator from "./screens/ProfileScreen";
import FavoriteStackNavigator from "./screens/FavoriteScreen";

const FB_APP_ID = facebookID;

class FacebookAuth extends Component {
  _handlePressAsync = async () => {
    this.props.fetchUser();

    let redirectUrl = AuthSession.getRedirectUrl();

    // login and get a token
    let result = await AuthSession.startAsync({
      authUrl: `https://www.facebook.com/v3.2/dialog/oauth?response_type=token&client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}`
    });

    if (result.type === "success") {
      const token = result.params.access_token;

      //use token to get user userData
      const userData = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      //users id
      const id = JSON.parse(userData._bodyInit).id;
      const name = JSON.parse(userData._bodyInit).name;

      const loginPost2 = await fetch(`http://${IP}:4006/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, info: { userName: name }, hi: "hi again" })
      }).then(data =>
        this.props.fetchUserSuccess(JSON.parse(data._bodyInit)[0])
      );
    }
  };

  render() {
    return (
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
    isFetching: state.userReducer.isFetching
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
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="search" color={tintColor} size={32} />;
        }
      }
    },
    Favorites: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="heart" color={tintColor} size={32} />;
        }
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="user" color={tintColor} size={32} />;
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
        elevation: 5,
        paddingTop: 10
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
