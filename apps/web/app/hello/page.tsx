// External packages
import { Test } from "@/components/test";
import { serverSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await serverSession();

  if (!user) redirect("/login");

  return (
    <>
      <h1>Hello, {user.username}</h1>
      <Test />
    </>
  );
}
