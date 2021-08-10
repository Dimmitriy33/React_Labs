import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducers";

const middlewares = [thunk];

export const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
