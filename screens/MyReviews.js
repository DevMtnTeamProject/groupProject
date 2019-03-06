import React, { Component } from "react";

class MyReviews extends Component {
  static navigationOptions = {
    headerTitle: "MYREVIEWS"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>My Reviews</Text>
        <ReviewCard />
      </View>
    );
  }
}

const MyReviewsStackNavigator = createStackNavigator({
  myReviews: myReviews
});

export default MyReviewsStackNavigator;
