import { IRegisterUser } from "@/components/users/userContext";
import connectionString from "@/constants/db";

export async function getToken(uEmail: string, uPassword: string): Promise<string | null> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(`${connectionString}/api/auth/sign-in`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      email: uEmail,
      password: uPassword,
    }),
  });

  if (response.ok) {
    return response.text();
  }

  return null;
}

export async function registerUser(user: IRegisterUser): Promise<boolean> {
  let responseResult = false;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      addressDelivery: user.addressDelivery,
      password: user.password,
    }),
  };

  const response = await fetch(`${connectionString}/api/auth/sign-up`, requestOptions);
  if (response.ok) {
    responseResult = true;
  }

  return responseResult;
}
