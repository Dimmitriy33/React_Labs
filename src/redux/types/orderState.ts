export interface IOrder {
  key: string;
  name: string;
  amount: number;
  date: string;
  address: string;
  price: number;
}

export interface IOrderStore {
  orders: IOrder[];
}
