import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducers";

const middlewares = [thunk];

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(reducer, applyMiddleware(...middlewares));
