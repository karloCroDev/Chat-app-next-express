// External packages
import { Test } from "@/components/test";
import { serverSession } from "@/lib/actions/session";

export default async function Page() {
  const user = await serverSession();
  console.log(user);

  return <Test />;
}
