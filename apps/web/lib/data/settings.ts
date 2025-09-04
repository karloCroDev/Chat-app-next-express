import { UpdateUserFetch } from "@/hooks/settings";
import { SettingsResponse } from "@repo/types";

export async function updateUser({ data, file }: UpdateUserFetch) {
  const response = await fetch("http://localhost:4000/chat/settings", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const returnVals: SettingsResponse = await response.json();

  if (returnVals.presignedUrl && data.image && file) {
    await fetch(returnVals.presignedUrl, {
      method: "PUT",
      headers: { "Content-type": data.image.contentType },
      body: file,
    });
  }

  return returnVals;
}
