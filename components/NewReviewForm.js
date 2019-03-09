import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import Icon from "@expo/vector-icons/Ionicons";
import { IP, googleApiKey } from "../config";

// StyleSheet below component

class NewReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      predictions: [],
      restaurantName: "",
      restaurantId: "",
      latLng: {
        latitude: "",
        longitude: ""
      },
      address: "",
      review: "",
      order: "",
      avoid: "",
      photos: []
    };
  }

  onDestinationSearch = async searchString => {
    const { latitude, longitude } = this.props.userLatLng;

    this.setState({ restaurantName: searchString });
    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}&input=${searchString}&types=establishment&location=${latitude},${longitude}&radius=2000`;

    try {
      const result = await fetch(place_search_url);
      const json = await result.json();
      const predictions = json.predictions;
      this.setState({
        isOpen: true,
        predictions
      });
    } catch (err) {
      console.error(err);
    }
  };
  onDestinationSelect = async prediction => {
    const place_details_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      prediction.place_id
    }&fields=name,place_id,geometry,formatted_address&key=${googleApiKey}`;

    this.setState({
      restaurantName: prediction.structured_formatting.main_text
    });
    try {
      const result = await fetch(place_details_url);
      const details = await result.json();
      console.log("predicttion", prediction);
      // this.props.fetchDestinationDetails(details);
      const { formatted_address, place_id, geometry, name } = details.result;
      this.setState({
        isOpen: false,
        restaurantName: name,
        restaurantId: place_id,
        address: formatted_address,
        latLng: geometry.location
      });
      console.log("this.state", this.state);
    } catch (err) {
      console.error(err);
    }
  };
  onSaveReview = async () => {
    const { id, userName } = this.props;
    const {
      restaurantName,
      restaurantId,
      address,
      review,
      order,
      avoid
    } = this.state;
    await fetch(`http://${IP}:4006/post-review/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        info: {
          id,
          userName,
          restaurantName,
          restaurantId,
          address,
          review,
          order,
          avoid
        }
      })
    })
      .then(response => {
        console.log("save review response", response);
      })
      .catch(error => {
        console.log("error saving new review", error);
      });
  };

  render() {
    const predictionDropdown = this.state.predictions.map(prediction => {
      return (
        <ListItem
          key={prediction.place_id}
          title={prediction.structured_formatting.main_text}
          subtitle={prediction.structured_formatting.secondary_text}
          onPress={() => this.onDestinationSelect(prediction)}
          bottomDivider
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text>Write a Review</Text>
          <Text>Add Photos</Text>
        </View>
        <Text style={styles.header}>Write a Review</Text>
        <TouchableOpacity style={styles.searchWrapper}>
          <TextInput
            value={this.state.restaurantName}
            placeholder="Restaurant Name"
            onChangeText={searchString =>
              this.onDestinationSearch(searchString)
            }
          />
          <Icon
            name="ios-search"
            size={24}
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </TouchableOpacity>
        {!!this.state.predictions && this.state.isOpen === true && (
          <View>{predictionDropdown}</View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "right",
            width: "100%",
            marginTop: 5
          }}
        >
          <Text style={{ fontSize: 12, fontColor: "'#a49694'" }}>
            {this.state.address}
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="So, what did you think overall?"
            style={styles.textArea}
            value={this.state.review}
            multiline={true}
            onChangeText={text => this.setState({ review: text })}
          />
          <TextInput
            placeholder="What dishes would you recommend?"
            style={styles.input}
            value={this.state.order}
            onChangeText={text => this.setState({ order: text })}
          />
          <TextInput
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
  const { _id, userName } = state.userReducer.user;
  const { userLatLng } = state.mapReducer;
  return {
    id: _id,
    userName,
    userLatLng
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
  searchWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 13,
    color: "#a49694",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 0,
    marginTop: 5,
    marginBottom: 5
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
