import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log("user is authenticated");
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("UserAuth");
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}
