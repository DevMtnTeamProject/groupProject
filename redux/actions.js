import axios from "axios";

// CONSTANTS
const SAVE_REVIEW_COMPLETE = "ADD_REVIEW_COMPLETE";
const GET_FAV_LIST_COMPLETE = "GET_FAV_LIST_COMPLETE";
const GET_FRIEND_LIST_COMPLETE = "GET_FRIEND_LIST_COMPLETE";
const GET_USER_MAP_COMPLETE = "GET_USER_MAP_COMPLETE";

// ACTION CREATORS
export function saveReview({ review }) {
  return {
    type: SAVE_REVIEW_COMPLETE,
    payload: review
  };
}

// API CALLS
