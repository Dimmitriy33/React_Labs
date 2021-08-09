import { IRegisterUser } from "@/components/users/userContext";

async function registerUser(user: IRegisterUser): Promise<boolean> {
  let responseResult = false;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      addressDelivery: user.addressDelivery,
      password: user.password,
    }),
  };

  const response = await fetch("http://localhost:8000/api/auth/sign-up", requestOptions);
  if (response.ok) {
    responseResult = true;
  }

  return responseResult;
}

export default registerUser;
