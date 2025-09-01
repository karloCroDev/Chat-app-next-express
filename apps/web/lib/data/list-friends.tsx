import { UsersSidebar } from "@repo/types";

export async function listRequests(): Promise<UsersSidebar[]> {
  const response = await fetch("http://localhost:4000/chat/list-friends", {
    credentials: "include",
  });

  return await response.json();
}
