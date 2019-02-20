import axios from "axios";
import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILURE } from "./userReducer";
// CONSTANTS
const SAVE_REVIEW_COMPLETE = "ADD_REVIEW_COMPLETE";
const GET_FAV_LIST_COMPLETE = "GET_FAV_LIST_COMPLETE";
const GET_FRIEND_LIST_COMPLETE = "GET_FRIEND_LIST_COMPLETE";
const GET_USER_MAP_COMPLETE = "GET_USER_MAP_COMPLETE";

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
