import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer } from "./reducers";

const middlewares = [thunk];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducer, composedEnhancer);
export default store;
