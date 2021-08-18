import connectionString from "@/constants/db";
import { IOrder } from "@/redux/types/orderState";

interface IOrderRequest {
  productId: string;
  amount: number;
}

export default async function makeAnOrder(games: IOrder[], token: string): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const arr: IOrderRequest[] = [];
  for (let i = 0; i < games.length; i++) {
    arr.push({
      productId: games[i].key,
      amount: games[i].amount,
    });
  }

  const raw = JSON.stringify(arr);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(`${connectionString}/api/orders `, requestOptions);

  if (response.ok) {
    return true;
  }

  return false;
}
