"server-only";

import { cookies } from "next/headers";

export async function serverSession() {
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

  return await res.json();
}
