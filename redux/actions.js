import axios from "axios";
import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILURE } from "./userReducer";
import { FETCH_USER_LATLNG_SUCCESS } from "./mapReducer";

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

export function fetchUserLocation(LatLng) {
  return {
    type: FETCH_USER_LATLNG_SUCCESS,
    payload: LatLng
  };
}
export function saveReview({ review }) {
  return {
    type: SAVE_REVIEW_COMPLETE,
    payload: review
  };
}

// API CALLS
