import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILURE } from "./userReducer";
import {
  FETCH_USER_LATLNG_SUCCESS,
  FETCH_GOOGLE_PREDICTIONS_SUCCESS,
  FETCH_SELECTED_DESTINATION_SUCCESS,
  FETCH_DESTINATION_DETAILS_SUCCESS,
  FETCH_NEARBY_RESTAURANTS_SUCCESS
} from "./mapReducer";

// ACTION CREATORS

// USER ACTION CREATORS
export function fetchUser() {
  return {
    type: IS_FETCHING
  };
}
export function fetchUserSuccess(data) {
  return {
    type: FETCHING_SUCCESS,
    payload: data
  };
}
export function fetchUserFailure(err) {
  return {
    type: FETCHING_FAILURE,
    payload: err
  };
}

// MAPS & PLACE SEARCH
export function fetchUserLocation(LatLng) {
  return {
    type: FETCH_USER_LATLNG_SUCCESS,
    payload: LatLng
  };
}
export function fetchSearchPredictions(predictions) {
  return {
    type: FETCH_GOOGLE_PREDICTIONS_SUCCESS,
    payload: predictions
  };
}
export function fetchSelectedDestination(destination) {
  return {
    type: FETCH_SELECTED_DESTINATION_SUCCESS,
    payload: destination
  };
}
export function fetchDestinationDetails(details) {
  return {
    type: FETCH_DESTINATION_DETAILS_SUCCESS,
    payload: details
  };
}

export function fetchNearbyRestaurants(restaurants) {
  return {
    type: FETCH_NEARBY_RESTAURANTS_SUCCESS,
    payload: restaurants
  };
}

export function saveReview({ review }) {
  return {
    type: SAVE_REVIEW_COMPLETE,
    payload: review
  };
}

// API CALLS
