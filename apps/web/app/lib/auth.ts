import { LoginArgs } from "@repo/schemas";

export async function login(data: LoginArgs): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  return await response.json();
}
