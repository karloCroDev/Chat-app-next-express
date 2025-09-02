"use server";

import { cookies } from "next/headers";
import { ChatResponse, type SessionSuccessResponse } from "@repo/types";

export async function listChat(username: string): Promise<ChatResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const res = await fetch(
      `http://localhost:4000/chat/list-chat?username=${username}`,
      {
        headers: {
          cookie: `token=${token}`,
        },
        cache: "no-store",
        next: { tags: ["chats"] },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
