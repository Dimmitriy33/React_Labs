// eslint-disable-next-line import/no-cycle
import React from "react";

export interface IUser {
  id: string;
  userName: string;
  phoneNumber: string;
  addressDelivery: string;
  concurancyStamp: string;
}

export interface IRegisterUser {
  email: string;
  userName: string;
  phoneNumber: string;
  addressDelivery: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IContext {
  user: IUser;
  token: string;
  login: (token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

const UserContext = React.createContext<IContext | null>(null);

export default UserContext;
