import { ResetPasswordForm } from "@/components/reset-password-form";

export default async function TokenPage() {
  return (
    <>
      <h1 className="text-2xl font-bold ">Enter your details</h1>
      <ResetPasswordForm />
    </>
  );
}
