import { createStore } from "redux";
import reducer from "./redux/reducer";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(reducer, applyMiddleware(promiseMiddleware()));
export default store;
