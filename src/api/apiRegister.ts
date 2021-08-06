import { IRegisterUser } from "@/components/users/userContext";

async function registerUser(user: IRegisterUser): Promise<void> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: user.email,
    userName: user.userName,
    phoneNumber: user.phoneNumber,
    addressDelivery: user.addressDelivery,
    password: user.password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  await fetch("http://localhost:8000/api/auth/sign-up", requestOptions)
    .then((result) => console.log(result.status))
    .catch((error) => console.log("error", error));
}

export default registerUser;
