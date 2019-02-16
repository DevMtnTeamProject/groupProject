const initialState = {
  isFetching: false
};

export const IS_FETCHING = "IS_FETCHING";
export const FETCHING_SUCCESS = "FETCHING_SUCCESS";
export const FETCHING_FAILURE = "FETCHING_FAILURE";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return Object.assign({}, state, { isFetching: true });
    case FETCHING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.payload
      });
    case FETCHING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.payload
      });
    default:
      return state;
  }
};

export default userReducer;
