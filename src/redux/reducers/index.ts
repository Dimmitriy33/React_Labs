import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

export const reducer = combineReducers({
  userReducer,
  orderReducer,
});

export type state = ReturnType<typeof reducer>;
