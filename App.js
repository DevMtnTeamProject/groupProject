import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AuthSession } from "expo";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import HomeScreen from "./views/HomeScreen";

const FB_APP_ID = "2051924541563103";

class FacebookAuth extends Component {
  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log("this is redirectUrl", redirectUrl);
    // login and get a token
    let result = await AuthSession.startAsync({
      authUrl: `https://www.facebook.com/v3.2/dialog/oauth?response_type=token&client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}`
    });
    console.log("RESULT", result);
    if (result.type === "success") {
      const token = result.params.access_token;

      //use token to get user userData
      const userData = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      //users id
      const id = JSON.parse(userData._bodyInit).id;

      console.log("this is userData id", JSON.parse(userData._bodyInit).id);
      // this will get friends list who have installed the app
      // const friends = await fetch(
      //   `https://graph.facebook.com/${id}/friends?access_token=${token}`
      // );
      // console.log("this is friends", friends);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View />
        <Button title="LOG IN" onPress={this._handlePressAsync} />
      </View>
    );
  }
}

// Routes
const AppNavigator = createStackNavigator(
  {
    Login: FacebookAuth,
    Home: HomeScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
