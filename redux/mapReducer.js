const initialState = {
  userLatLng: {},
  userMarkers: [],
  friendReviewedMarkers: [],
  searchString: "",
  googlePredictions: [],
  selectedDestination: {},
  destinationDetails: {},
  nearbyRestaurants: []
};

// export const ON_REGION_CHANGE_SUCCESS = "ON_REGION_CHANGE_SUCCESS";
export const FETCH_USER_LATLNG_SUCCESS = "FETCH_USER_LATLNG_SUCCESS";
export const FETCH_GOOGLE_PREDICTIONS_SUCCESS =
  "FETCH_GOOGLE_PREDICTIONS_SUCCESS";
export const FETCH_SELECTED_DESTINATION_SUCCESS =
  "FETCH_SELECTED_DESTINATION_SUCCESS";
export const FETCH_DESTINATION_DETAILS_SUCCESS =
  "FETCH_DESTINATION_DETAILS_SUCCESS";
export const FETCH_NEARBY_RESTAURANTS_SUCCESS =
  "FETCH_NEARBY_RESTAURANTS_SUCCESS";

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LATLNG_SUCCESS:
      return Object.assign({}, state, {
        userLatLng: action.payload
      });
    case FETCH_GOOGLE_PREDICTIONS_SUCCESS:
      return Object.assign({}, state, {
        googlePredictions: action.payload
      });
    case FETCH_SELECTED_DESTINATION_SUCCESS:
      return Object.assign({}, state, {
        selectedDestination: action.payload
      });
    case FETCH_DESTINATION_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        destinationDetails: action.payload
      });
    case FETCH_NEARBY_RESTAURANTS_SUCCESS:
      return Object.assign({}, state, {
        nearbyRestaurants: action.payload
      });
    default:
      return state;
  }
};

export default mapReducer;
