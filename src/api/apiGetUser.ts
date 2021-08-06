import { IUser } from "@/components/users/userContext";

async function getUser(token: string): Promise<IUser> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(`/api/user`, requestOptions);

  return response.json();
}

export default getUser;
