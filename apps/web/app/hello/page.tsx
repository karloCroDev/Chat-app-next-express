import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // your JWT cookie name

  if (!token) return <p>Please log in</p>;

  // Verify JWT or fetch session from backend
  const res = await fetch("http://localhost:4000/auth/session", {
    headers: {
      cookie: `token=${token}`, // forward cookie to Express backend
    },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);
  return <div>Hello</div>;
}
