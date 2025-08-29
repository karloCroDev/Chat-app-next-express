import { SettingsArgs } from "@repo/schemas";
import { SettingsResponse } from "@repo/types";

export async function updateUser(
  data: SettingsArgs
): Promise<SettingsResponse> {
  const response = await fetch("http://localhost:4000/chat/settings", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
