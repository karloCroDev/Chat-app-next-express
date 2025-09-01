"use server";

import { cookies } from "next/headers";
import { type SessionSuccessResponse } from "@repo/types";

export async function serverSession(): Promise<SessionSuccessResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const res = await fetch("http://localhost:4000/auth/session", {
      headers: {
        cookie: `token=${token}`,
      },
      cache: "no-store",
      next: { tags: ["session"] },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
