import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { IP } from "../config";

class MyReviews extends Component {
  static navigationOptions = {
    headerTitle: "MYREVIEWS"
  };
  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    // get id from redux
    const { data, id } = this.props;
    await fetch(`http://${IP}:4006/get-reviews/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
      //   body: JSON.stringify({ info: { data } })
    })
      .then(response => {
        console.log("my reviews", response);
      })
      .catch(error => {
        console.log("Error getting reviews", error);
      });
  };

  render() {
    // map over getreview returned object
    // reviews.map(review => (
    // <Text >some part of review data</Text>
    //   ))
    const mockData = {
      review: "this is the review",
      order: "recommended dish",
      avoid: "dish to avoid",
      // restaurantId: String,
      // authorId: String,
      userName: "adam",
      image: "https:go grab a photo"
    };
    return (
      <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
        <Text>My Reviews</Text>
        <Text>{mockData.review}</Text>
        <Text />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.userReducer.user.id
  };
};

export default connect(mapStateToProps)(MyReviews);
