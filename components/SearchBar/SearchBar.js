import React, { Component } from "react";
import { googleApiKey } from "../../config";
import {
  View,
  TextInput,
  TouchableOpacity,
  SectionList,
  Text
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      googlePredictions: [],
      selectedDestination: {}
    };
  }
  onDestinationSearch = async searchString => {
    const { latitude, longitude } = this.props.userLatLng;
    this.setState({ searchString });

    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}
    &input=${searchString}&location=${latitude},${longitude}&radius=2000`;

    try {
      const result = await fetch(place_search_url);
      const json = await result.json();
      console.log("these are the prediction results", json.predictions);
      this.setState({ googlePredictions: json.predictions });
    } catch (err) {
      console.error(err);
    }
  };

  onDestinationSelect = prediction => {
    console.log("selected prediction", prediction);
    this.setState({ selectedDestination: prediction });
  };

  render() {
    const predictions = this.state.googlePredictions.map(prediction => {
      return (
        <TouchableOpacity
          key={prediction.place_id}
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
          onPress={prediction => this.onDestinationSelect(prediction)}
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
      <View style={{ position: "absolute", width: "100%" }}>
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
              placeholder="Find a Restaurant"
              style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              value={this.state.searchString}
              onChangeText={searchString =>
                this.onDestinationSearch(searchString)
              }
            />
          </View>
          <ScrollView style={{ flex: 1 }}>{predictions}</ScrollView>
        </View>
      </View>
    );
  }
}
