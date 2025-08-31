import { ListUsersResponse } from "@repo/types";
import { ListUsersArgs } from "@repo/schemas";

export async function listUsers(
  data: ListUsersArgs
): Promise<ListUsersResponse[]> {
  const response = await fetch("http://localhost:4000/chat/list-users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
}
