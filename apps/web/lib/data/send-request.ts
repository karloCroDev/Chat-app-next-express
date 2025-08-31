import { SendRequestResponse } from "@repo/types";

export async function sendRequest(id: string): Promise<SendRequestResponse> {
  const response = await fetch("http://localhost:4000/chat/send-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
