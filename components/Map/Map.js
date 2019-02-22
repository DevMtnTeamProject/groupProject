import React from "react";
import { StyleSheet } from "react-native";
import mapstyles from "./mapstyles.json";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      markers: [],
      destination: "",
      nearbyRestaurants: [],
      predictions: []
    };
  }
  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log("error", "error");
    } else {
      this._getUserLocationPermission().catch(err => console.log("error", err));
    }
  }

  _getUserLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("error getting location permission", error);
    } else {
      this._getLocationAsync();
    }
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      userLatitude: location.coords.latitude,
      userLongitude: location.coords.longitude
    });
    !!location && this.getRestaurantsNearby();
  };

  getRestaurantsNearby = async () => {
    const { userLatitude, userLongitude } = this.state;
    const nearby_api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=2000&types=restaurant&rankedby=distance&key=${googleApiKey}`;

    try {
      const nearbyResults = await fetch(nearby_api_url);
      const json = await nearbyResults.json();
      const restaurantArr = json.results.map(r => ({
        place_id: r.place_id,
        latLng: {
          latitude: r.geometry.location.lat,
          longitude: r.geometry.location.lng
        },
        name: r.name,
        address: r.vicinity
      }));
      this.setState({ nearbyRestaurants: restaurantArr });
    } catch (err) {
      console.error(err);
    }
  };

  //  search by text
  onDestinationSearch = async destination => {
    const { userLatitude, userLongitude } = this.state;

    this.setState({ destination });

    const place_search_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}
  &input=${destination}&location=${userLatitude},${userLongitude}&radius=2000`;

    try {
      const result = await fetch(place_search_url);
      const json = await result.json();
      console.log("these are the prediction results", json.predictions);
      this.setState({ predictions: json.predictions });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const predictions = this.state.predictions.map(prediction => {
      return (
        <ScrollView>
          <Text key={prediction.id}>{prediction.description}</Text>
        </ScrollView>
      );
    });
    const region = {
      latitude: this.state.userLatitude,
      longitude: this.state.userLongitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={region}
          style={styles.map}
          customMapStyle={mapstyles}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onRegionChange={this._getLocationAsync}
        >
          {!!this.state.nearbyRestaurants &&
            !!this.state.nearbyRestaurants.length &&
            this.state.nearbyRestaurants.map(r => (
              <Marker
                key={r.place_id}
                coordinate={r.latLng}
                title={r.name}
                description={r.address}
              />
            ))}
        </MapView>
        <React.Fragment>
          <TextInput
            placeholder="Search for a restaurant"
            style={styles.textInput}
            value={this.state.searchString}
            onChangeText={destination => this.onDestinationSearch(destination)}
          />
          {predictions}
        </React.Fragment>
      </View>
    );
  }
}
