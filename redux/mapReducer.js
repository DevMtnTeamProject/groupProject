const initialState = {
  userLatLng: {},
  userMarkers: [],
  friendReviewedMarkers: [],
  searchString: "",
  searchPredictionResults: [],
  restaurantDetails: {}
};

// export const ON_REGION_CHANGE_SUCCESS = "ON_REGION_CHANGE_SUCCESS";
export const FETCH_USER_LATLNG_SUCCESS = "FETCH_USER_LATLNG_SUCCESS";

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LATLNG_SUCCESS:
      return Object.assign({}, state, {
        userLatLng: action.payload
      });
    default:
      return state;
  }
};

export default mapReducer;
