import { Dispatch } from "redux";
import { OrderActionTypes } from "../types/orderActionTypes";
import { IOrder } from "../types/orderState";

function addGameToCart(game: IOrder) {
  return {
    type: OrderActionTypes.ADD_GAME,
    payload: {
      order: game,
    },
  };
}

function removeGameFromCart(game: IOrder) {
  return {
    type: OrderActionTypes.REMOVE_GAME,
    payload: {
      order: game,
    },
  };
}

function removeAllGamesFromCart() {
  return {
    type: OrderActionTypes.REMOVE_ALL_GAMES,
  };
}

export const addGameToCartAsync =
  (game: IOrder) =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(addGameToCart(game));
  };

export const removeGameFromCartAsync =
  (game: IOrder) =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(removeGameFromCart(game));
  };

export const removeAllGamesFromCartAsync =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await dispatch(removeAllGamesFromCart());
  };
