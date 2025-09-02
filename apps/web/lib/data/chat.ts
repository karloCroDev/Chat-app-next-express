import { AddMessageArgs } from "@repo/schemas";

export async function addMessage(data: AddMessageArgs) {
  const response = await fetch("http://localhost:4000/chat/add-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
}
