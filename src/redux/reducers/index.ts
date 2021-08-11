import { combineReducers } from "redux";
import userReducer from "./userReducer";

export const reducer = combineReducers({
  userReducer,
});

export type state = ReturnType<typeof reducer>;
