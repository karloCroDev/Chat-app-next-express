import { serverSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverSession();

  if (!user) redirect("/auth/login");

  return (
    <div>
      <h1>Test Layout</h1>
      {children}
    </div>
  );
}
