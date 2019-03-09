import React, { Component } from "React";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, Text, Icon } from "react-native";
import StarRating from "react-native-star-rating";
import colors from "../../styles/colors";
// import FontAwesome, { Icons } from "react-native-fontawesome";

class GeneralStarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      fullStarColor: "",
      starSize: 0
    };
  }

  onStarRatingPress(rating) {
    //something needs to go here to send the data to the backend
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={rating => this.onStarRatingPress(rating)}
        fullStarColor={colors.yellow}
        starSize={30}
      />
    );
  }
}

export default GeneralStarExample;

//we don't want the stars actually clickable on the review card from someone else.
