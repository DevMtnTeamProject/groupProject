import React, { Component } from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import * as firebase from "firebase";
import Icon from "@expo/vector-icons/EvilIcons";

import store from "./store";
import { Provider } from "react-redux";
import { firebaseConfig } from "./config";

import connectedLoadingScreen from "./screens/LoadingScreen";
import HomeStackNavigator from "./screens/HomeScreen";
import ProfileStackNavigator from "./screens/ProfileScreen";
import FavoriteStackNavigator from "./screens/FavoriteScreen";
import connectedFacebookAuth from "./screens/FacebookAuth";

import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


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

const AppSwitchNavigator = createSwitchNavigator(
  {
    Loading: connectedLoadingScreen,
    UserAuth: connectedFacebookAuth,
    Home: AppTabNavigator
  },
  {
    initialRouteName: "Loading"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
