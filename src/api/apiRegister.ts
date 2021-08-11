import { IRegisterUser } from "@/components/users/userContext";
import connectionString from "@/constants/db";

async function registerUser(user: IRegisterUser): Promise<boolean> {
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

export default registerUser;
