import { IUser } from "@/components/users/userContext";
import connectionString from "@/constants/db";

async function updateUser(token: string, user: IUser): Promise<IUser | null> {
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

export default updateUser;
