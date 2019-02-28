import React, { Component } from "react";
import { View, Text, TextInput, Image, Button, StyleSheet } from "react-native";

// StyleSheet below component

export default class NewReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: "",
      location: "",
      review: "",
      order: "",
      avoid: "",
      photos: []
    };
  }
  // TODO: add function that will populate restaurant name & location if selected from map

  // save to db & clear inputs
  onSaveReview = () => {
    // axios.post()
    console.log("saved review");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Write a Review</Text>
        <TextInput
          name="name"
          value={this.state.restaurantName}
          placeholder="Restaurant Name"
          style={styles.input}
          onChangeText={text => this.setState({ restaurantName: text })}
        />
        <TextInput
          name="location"
          placeholder="Location"
          value={this.state.location}
          style={styles.input}
          onChangeText={text => this.setState({ location: text })}
        />
        <View style={styles.section}>
          {/* add functionality to take and attach photo to review here */}
          <TextInput
            name="review"
            placeholder="So, what did you think overall?"
            style={styles.textArea}
            value={this.state.review}
            multiline={true}
            onChangeText={text => this.setState({ review: text })}
          />
          <TextInput
            name="order"
            placeholder="What dishes would you recommend?"
            style={styles.input}
            value={this.state.order}
            onChangeText={text => this.setState({ order: text })}
          />
          <TextInput
            name="avoid"
            placeholder="What dishes should your friends avoid?"
            style={styles.input}
            value={this.state.avoid}
            onChangeText={text => this.setState({ avoid: text })}
          />
        </View>
        {/* <Button title="Save" onPress={this.handleSave} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    padding: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 13,
    color: "black",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 0,
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10
  },
  section: {
    marginTop: 30
  },
  textArea: {
    minHeight: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 13,
    color: "black",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 0,
    marginTop: 5,
    marginBottom: 5
  }
});
