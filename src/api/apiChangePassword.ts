import connectionString from "@/constants/db";

async function changePassword(id: string, token: string, oldPassword: string, newPassword: string): Promise<boolean> {
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

export default changePassword;
