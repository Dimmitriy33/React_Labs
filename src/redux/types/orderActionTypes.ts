import { IOrder } from "./orderState";

// eslint-disable-next-line no-shadow
export enum OrderActionTypes {
  ADD_GAME = "ADD_GAME",
  REMOVE_GAME = "REMOVE_GAME",
  REMOVE_ALL_GAMES = "REMOVE_ALL_GAMES",
}

// add game
export interface IGamePayload {
  order: IOrder;
}

export interface IAddGamePayload {
  type: OrderActionTypes.ADD_GAME;
  payload: IGamePayload;
}

// remove game

export interface IRemoveGamePayload {
  type: OrderActionTypes.REMOVE_GAME;
  payload: IGamePayload;
}

// remove all games

export interface IRemoveAllGamesPayload {
  type: OrderActionTypes.REMOVE_ALL_GAMES;
}

export type IOrderAction = IAddGamePayload | IRemoveGamePayload | IRemoveAllGamesPayload;
