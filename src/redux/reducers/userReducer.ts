import { IUserAction, UserActionTypes } from "../types/userActionTypes";
import { IUserStore } from "../types/userState";

export const initialState: IUserStore = {
  user: {
    id: "",
    userName: "",
    phoneNumber: "",
    addressDelivery: "",
    concurancyStamp: "",
  },
  token: "",
  isAuthenticated: false,
};

export default function userReducer(state: IUserStore = initialState, action: IUserAction): IUserStore {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state, token: action.payload.token, isAuthenticated: true };
    }
    case UserActionTypes.LOGOUT_USER: {
      return {
        ...state,
        user: initialState.user,
        token: initialState.token,
        isAuthenticated: initialState.isAuthenticated,
      };
    }
    case UserActionTypes.SET_USER: {
      return { ...state, user: action.payload.user };
    }
    default: {
      return { ...state };
    }
  }
}
