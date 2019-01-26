import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import NewReviewForm from "./components/NewReviewForm";
import { AuthSession } from "expo";

const FB_APP_ID = "2051924541563103";

export default class App extends React.Component {
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
        <Button title="Open FB Auth" onPress={this._handlePressAsync} />
        <NewReviewForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});
