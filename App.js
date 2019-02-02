import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { AuthSession } from "expo";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import HomeScreen from "./views/HomeScreen";
import FavoriteScreen from "./views/FavoriteScreen";

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

      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem("userToken");

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
      };
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
