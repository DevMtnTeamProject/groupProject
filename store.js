import { combineReducers } from "redux";
import Reactotron from "./ReactotronConfig";
import mapReducer from "./redux/mapReducer";
import userReducer from "./redux/userReducer";
import promiseMiddleware from "redux-promise-middleware";

const store = Reactotron.createStore(
  combineReducers({ mapReducer, userReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
