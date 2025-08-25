// External packages
import { Test } from "@/components/test";
import { serverSession } from "@/lib/actions/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await serverSession();

  if (!user) redirect("/login");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log(token);

  const someProtectedData = await fetch("http://localhost:4000/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  console.log("Protected data:", someProtectedData);
  return (
    <>
      <h1>Hello, {user.username}</h1>
      <Test />
    </>
  );
}
