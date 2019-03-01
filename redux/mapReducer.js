const initialState = {};

const SAVE_REVIEW_COMPLETE = "SAVE_REVIEW_COMPLETE";
const GET_FAV_LIST_COMPLETE = "GET_FAV_LIST_COMPLETE";
const GET_FRIEND_LIST_COMPLETE = "GET_FRIEND_LIST_COMPLETE";
const GET_USER_MAP_COMPLETE = "GET_USER_MAP_COMPLETE";

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MAP_COMPLETE:
      return;
    default:
      return state;
  }
};

export default reducer;
