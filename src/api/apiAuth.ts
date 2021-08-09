async function getToken(uEmail: string, uPassword: string): Promise<string | null> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch("http://localhost:8000/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
