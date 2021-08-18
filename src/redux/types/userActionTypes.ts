import { IUser } from "@/components/users/userContext";

// eslint-disable-next-line no-shadow
export const enum UserActionTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_USER = "SET_USER",
}

// login
export interface ILoginUserPayload {
  token: string;
}

export interface ILoginUser {
  type: UserActionTypes.LOGIN_USER;
  payload: ILoginUserPayload;
}

// logout

export interface ILogoutUser {
  type: UserActionTypes.LOGOUT_USER;
}

// set user
export interface ISetUserPayload {
  user: IUser;
}

export interface ISetUser {
  type: UserActionTypes.SET_USER;
  payload: ISetUserPayload;
}

export type IUserAction = ILoginUser | ILogoutUser | ISetUser;
