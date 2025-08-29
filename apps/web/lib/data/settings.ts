import { SettingsResponse } from "@repo/types";

export async function updateUser(data: FormData): Promise<SettingsResponse> {
  const response = await fetch("http://localhost:4000/chat/settings", {
    method: "PATCH",
    credentials: "include",
    body: data,
  });

  return await response.json();
}
