import { UsersSidebar } from "@repo/types";
import { SendRequestResponse } from "@repo/types";
import { ListUsersArgs } from "@repo/schemas";

export async function listRequests(): Promise<UsersSidebar[]> {
  const response = await fetch("http://localhost:4000/chat/list-requests", {
    credentials: "include",
  });

  return await response.json();
}

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

export async function listUsers(data: ListUsersArgs): Promise<UsersSidebar[]> {
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

export async function listFriends(): Promise<UsersSidebar[]> {
  const response = await fetch("http://localhost:4000/chat/list-friends", {
    credentials: "include",
  });

  return await response.json();
}

export async function acceptRequest(id: string): Promise<SendRequestResponse> {
  const response = await fetch("http://localhost:4000/chat/accept-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
export async function rejectRequest(id: string): Promise<SendRequestResponse> {
  const response = await fetch("http://localhost:4000/chat/reject-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  return await response.json();
}
