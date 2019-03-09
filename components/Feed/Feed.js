// make a request to get all of the reviews from friends and sort by date
// get all plated reviews and sort by date
import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import ReviewCard from "../ReviewCard/ReviewCard";

const { width } = Dimensions.get("window");
export default class Feed extends Component {
  render() {
    return (
      <View>
        <Text onPress={this.props.handleExpansion}>push me</Text>
        <ScrollView
          // ref={scrollView => {
          //   this.scrollView = scrollView;
          // }}
          style={
            this.props.expanded === true ? styles.expanded : styles.container
          }
          //pagingEnabled={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30
          }}
        >
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 10
  },
  expanded: { height: 300 }
});
