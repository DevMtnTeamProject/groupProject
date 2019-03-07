import React, { Component } from "react";
import { connect } from "react-redux";
import { googleApiKey } from "../../config";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import {
  fetchSearchPredictions,
  fetchSelectedDestination,
  fetchDestinationDetails
} from "../../redux/actions";
// TODO
// move state to redux
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      searchString: ""
    };
  }
  // search by keyword or name
  onDestinationSearch = async searchString => {
    const { latitude, longitude } = this.props.userLatLng;

    this.setState({ searchString });
    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}&input=${searchString}&types=establishment&location=${latitude},${longitude}&radius=2000`;

    try {
      const result = await fetch(place_search_url);
      const json = await result.json();
      const predictions = json.predictions;
      console.log("these are the prediction results", json.predictions);
      this.setState({ isOpen: true });
      this.props.fetchSearchPredictions(predictions);
    } catch (err) {
      console.error(err);
    }
  };

  onDestinationSelect = async prediction => {
    const place_details_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      prediction.place_id
    }&fields=name,place_id,geometry,formatted_address,types,rating,formatted_phone_number&key=${googleApiKey}`;
    this.props.fetchSelectedDestination(prediction);
    // this.setState({ searchString: "" });
    try {
      const result = await fetch(place_details_url);
      const details = await result.json();
      this.props.fetchDestinationDetails(details);
      this.setState({ isOpen: false });
      console.log(
        "this.props.destinationDetails",
        this.props.destinationDetails
      );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const predictions = this.props.googlePredictions.map(prediction => {
      return (
        <TouchableOpacity
          key={prediction.place_id}
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
          onPress={() => this.onDestinationSelect(prediction)}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 12
            }}
          >
            {prediction.description}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ position: "absolute", width: "100%", marginTop: 30 }}>
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            marginHorizontal: 20,
            marginTop: 10,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            elevation: 1
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Where are you going?"
              style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              value={this.state.searchString}
              onChangeText={searchString =>
                this.onDestinationSearch(searchString)
              }
            />
            <TouchableOpacity onPress={() => this.setState({ string: "" })}>
              <Icon name="ios-close" size={20} />
            </TouchableOpacity>
          </View>
          {this.props.googlePredictions && this.state.isOpen && (
            <ScrollView style={{ flex: 1 }}>{predictions}</ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    googlePredictions,
    selectedDestination,
    destinationDetails
  } = state.mapReducer;
  return {
    googlePredictions,
    selectedDestination,
    destinationDetails
  };
};
const mapActionsToProps = {
  fetchSearchPredictions,
  fetchSelectedDestination,
  fetchDestinationDetails
};

const connectedSearchBar = connect(
  mapStateToProps,
  mapActionsToProps
)(SearchBar);

export default connectedSearchBar;
