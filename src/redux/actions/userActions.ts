import { IUser } from "@/components/users/userContext";
import { Dispatch } from "redux";

function logout() {
  return {
    type: "LOGOUT_USER",
    payload: {
      token: "",
      user: {
        id: "",
        userName: "",
        phoneNumber: "",
        addressDelivery: "",
        concurancyStamp: "",
      },
      isAuthenticated: false,
    },
  };
}

function login(newToken: string) {
  return {
    type: "LOGIN_USER",
    payload: {
      token: newToken,
      isAuthenticated: true,
    },
  };
}

function setUser(newUser: IUser) {
  return {
    type: "SET_USER",
    payload: {
      user: newUser,
    },
  };
}

export const loginAsync =
  (token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(login(token));
  };

export const logoutAsync =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(logout());
  };

export const setUserAsync =
  (user: IUser) =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(setUser(user));
  };
