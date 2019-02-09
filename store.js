import { combineReducers } from "redux";
import Reactotron from "./ReactotronConfig";
import reducer from "./redux/reducer";
import userReducer from "./redux/userReducer";
import promiseMiddleware from "redux-promise-middleware";

const store = Reactotron.createStore(
  combineReducers({ reducer, userReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
