// External packages
import { serverSession } from "@/lib/actions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverSession();

  if (user) redirect("/chat");
  return (
    <>
      <Link
        href=".."
        className="rounded outline border p-4 absolute top-8 left-8"
      >
        <IoArrowBackOutline className="size-6" />
      </Link>

      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </main>
    </>
  );
}
