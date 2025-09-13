import {
  ForgotPasswordArgs,
  LoginArgs,
  RegisterArgs,
  ResetPasswordArgs,
  VerifyEmailArgs,
} from "@repo/schemas";
import {
  SessionSuccessResponse,
  LoginResponse,
  RegisterResponse,
  SendRequestResponse,
} from "@repo/types";
import { Verify } from "crypto";

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

export async function login(data: LoginArgs): Promise<LoginResponse> {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function register(data: RegisterArgs): Promise<RegisterResponse> {
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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

export async function forgotPassword(
  data: ForgotPasswordArgs
): Promise<SendRequestResponse> {
  try {
    const response = await fetch("http://localhost:4000/auth/forgot-password", {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function resetPassword(
  data: ResetPasswordArgs
): Promise<SendRequestResponse> {
  try {
    const response = await fetch("http://localhost:4000/auth/reset-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
export async function verifyEmail(
  data: VerifyEmailArgs
): Promise<SendRequestResponse> {
  try {
    const response = await fetch(
      "http://localhost:4000/auth/verify-token-otp",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
