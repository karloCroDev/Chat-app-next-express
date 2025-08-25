import { LoginArgs } from "@repo/schemas";
import { SessionSuccessResponse } from "@repo/types";

export async function clientSession(): Promise<SessionSuccessResponse | null> {
  try {
    const response = await fetch("http://localhost:4000/auth/session", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function login(data: LoginArgs) {
  try {
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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function register(data: LoginArgs) {
  try {
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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function logout() {
  try {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
