import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AuthSession } from "expo";
import {IP, facebookID} from './ignoreThis'


import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));

import { StyleSheet, View, Button } from "react-native";
import HomeScreen from "./views/HomeScreen";


class FacebookAuth extends Component {
  _handlePressAsync = async () => {
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

      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem("userToken");

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
      };

      
      const loginPost2 = await fetch(`http://${IP}:4006/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, info: { userName: name } })
      });
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

// ROUTES

// Main App Nav
const AppStack = createStackNavigator(
  {
    Auth: FacebookAuth,
    Home: HomeScreen
  },
  { initialRouteName: "Auth" }
);

const AppContainer = createAppContainer(AppStack);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
