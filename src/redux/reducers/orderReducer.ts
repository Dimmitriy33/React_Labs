import { IOrderAction, OrderActionTypes } from "../types/orderActionTypes";
import { IOrderStore } from "../types/orderState";

export const initialState: IOrderStore = {
  orders: [],
};

export default function orderReducer(state: IOrderStore = initialState, action: IOrderAction): IOrderStore {
  switch (action.type) {
    case OrderActionTypes.ADD_GAME: {
      let newOrders = state.orders;
      let isExist = false;
      state.orders.forEach((order) => {
        if (order.key === action.payload.order.key) {
          isExist = true;
        }
      });
      if (isExist) {
        newOrders = state.orders.map((i) => (i.key === action.payload.order.key ? { ...i, amount: i.amount + 1 } : i));
      } else {
        newOrders.push(action.payload.order);
      }
      return { ...state, orders: newOrders };
    }
    case OrderActionTypes.REMOVE_GAME: {
      const newOrders = state.orders;
      const index = newOrders.indexOf(action.payload.order);
      if (index > -1) {
        newOrders.splice(index, 1);
      }
      return { ...state, orders: newOrders };
    }
    case OrderActionTypes.REMOVE_ALL_GAMES: {
      return { ...state, orders: [] };
    }
    default: {
      return { ...state };
    }
  }
}
