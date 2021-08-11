import connectionString from "@/constants/db";

async function getToken(uEmail: string, uPassword: string): Promise<string | null> {
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

export default getToken;
