async function getToken(uEmail: string, uPassword: string): Promise<string> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await fetch("http://localhost:8000/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: uEmail,
      password: uPassword,
    }),
  });
  return token.text();
}

export default getToken;
