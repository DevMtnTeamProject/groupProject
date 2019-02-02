import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { AuthSession } from "expo";

import Reactotron from "reactotron-react-native";

// import axios from "axios";

import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));

import { StyleSheet, Text, View, Image, Button } from "react-native";
import HomeScreen from "./views/HomeScreen";
import FavoriteScreen from "./views/FavoriteScreen";

const FB_APP_ID = "2051924541563103";

class FacebookAuth extends Component {
  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();

    // delete
    Reactotron.log("hello rendering world");

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

      // const loginPost = await axios.post('localhost:4006/login-user', {id, name, test: 'hi hi hi'})

      const loginPost2 = await fetch("http://192.168.11.12:4006/login-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, info: { userName: name }, hi: "hi again" })
      });

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
        <Button title="LOG IN" onPress={this._handlePressAsync} />
        <Button
          title="HomeScreen"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

// class HomeScreen extends Component {
//   render() {
//     return (
//       <View>
//         <Text>This is HomeScreen</Text>
//         <Button
//           title="go back"
//           onPress={() => this.props.navigation.navigate("Auth")}
//         />
//       </View>
//     );
//   }
// }

// ROUTES

// Main App Nav
const AppStack = createStackNavigator(
  {
    Auth: FacebookAuth,
    Home: HomeScreen
    // Favorites: FavoriteScreen
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
