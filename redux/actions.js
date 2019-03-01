import axios from "axios";
import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILURE } from "./userReducer";

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
export function saveReview({ review }) {
  return {
    type: SAVE_REVIEW_COMPLETE,
    payload: review
  };
}

// API CALLS
