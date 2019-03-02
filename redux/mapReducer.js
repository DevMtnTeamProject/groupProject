const initialState = {
  userLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05
  },
  userMarkers: [],
  friendReviewedMarkers: [],
  searchString: "",
  searchPredictionResults: [],
  restaurantDetails: {}
};

// export const ON_REGION_CHANGE_SUCCESS = "ON_REGION_CHANGE_SUCCESS";

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mapReducer;
