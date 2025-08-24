import { LoginArgs } from "@repo/schemas";

export async function clientSession() {
  const response = await fetch("http://localhost:4000/auth/session", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }
  return await response.json();
}

export async function login(data: LoginArgs) {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to log in");
  }
  return await response.json();
}

export async function register(data: LoginArgs) {
  const response = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to log in");
  }
  return await response.json();
}
