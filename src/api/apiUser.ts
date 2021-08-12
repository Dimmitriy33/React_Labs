import { IUser } from "@/components/users/userContext";
import connectionString from "@/constants/db";

export async function updateUser(token: string, user: IUser): Promise<IUser | null> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: user.id,
    userName: user.userName,
    concurrencyStamp: user.concurancyStamp,
    phoneNumber: user.phoneNumber,
    addressDelivery: user.addressDelivery,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(`${connectionString}/api/user`, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return null;
}

export async function getUser(token: string): Promise<IUser | null> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(`/api/user`, requestOptions);

  if (response.ok) {
    return response.json();
  }
  return null;
}

export async function changePassword(
  id: string,
  token: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify([
    {
      op: "replace",
      path: "/Id",
      value: id,
    },
    {
      op: "replace",
      path: "/oldPassword",
      value: oldPassword,
    },
    {
      op: "replace",
      path: "/newPassword",
      value: newPassword,
    },
  ]);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(`${connectionString}/api/user/password`, requestOptions);

  if (response.ok) {
    return true;
  }

  return false;
}
