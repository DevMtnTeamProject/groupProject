import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import NewReviewForm from "./components/NewReviewForm";
import { AuthSession } from "expo";
// import axios from "axios";

  import('./Reactotron.Config').then(() => console.log('Reactotron Configured'))


const FB_APP_ID = "2051924541563103";

export default class App extends React.Component {
  _handlePressAsync = async () => {
    console.log('XXXXXXXXXXXX YEP YEP YEP YEP YEP')
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

      console.log('inside of IF')
      
      const token = result.params.access_token;

      //use token to get user userData
      const userData = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      //users id
      const id = JSON.parse(userData._bodyInit).id;

      const name = JSON.parse(userData._bodyInit).name;
      // this will get friends list who have installed the app
      // const friends = await fetch(
      //   `https://graph.facebook.com/${id}/friends?access_token=${token}`
      // );
      // console.log("this is friends", friends);
      console.log('dhauihfduiabfiuah',name)
      console.log('nifuebafuiebafui',id)

      // const loginPost = await axios.post('localhost:4006/login-user', {id, name, test: 'hi hi hi'})

      const loginPost2 = await fetch('http://localhost:4006/login-user', { method: 'POST', headers: { "Content-Type": "application/json"}, body: { id, name}})
      console.log('this is loginpost2', loginPost2)
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
