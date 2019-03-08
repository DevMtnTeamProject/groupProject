import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, TextInput, Image, Button, StyleSheet } from "react-native";
import { IP } from "../config";

// StyleSheet below component

class NewReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: "",
      latLng: {
        latitude: "",
        longitude: ""
      },
      location: "",
      review: "",
      order: "",
      avoid: "",
      photos: [],
      place_id: ""
    };
  }
  // TODO: add function that will populate restaurant name & location if selected from map
  // geocode address before saving to database
  // save to db & clear inputs
  onSaveReview = async () => {
    const { id, userName } = this.props;
    const stateObj = this.state
    await fetch(`http://${IP}:4006/post-review/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, info: {stateObj}, userName })
    })
      .then(response => {
        console.log("save review response", response);
      })
      .catch(error => {
        console.log(this.props.id)
        console.log("error saving new review", error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text>Write a Review</Text>
          <Text>Add Photos</Text>
        </View>
        <Text style={styles.header}>Write a Review</Text>
        <TextInput // need to have this be a google places autocomplete
          name="name"
          value={this.state.restaurantName}
          placeholder="Restaurant Name"
          style={styles.input}
          onChangeText={text => this.setState({ restaurantName: text })}
        />
        <TextInput
          name="location" // autopopulate with the google places autocomplete address response
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
        <Button title="Save" onPress={this.onSaveReview} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { userName } = state.userReducer.user;
  const{_id} = state.userReducer.user
  return {
<<<<<<< HEAD
    id: _id,
=======
    _id: id,
>>>>>>> 8eb9303ca9e045bde74799f9a2554584eb40bdad
    userName: userName
  };
};

const connectedNewReviewForm = connect(mapStateToProps)(NewReviewForm);
export default connectedNewReviewForm;

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
