import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default async function TokenPage() {
  return (
    <>
      <h1 className="text-2xl font-bold ">
        Please enter your email so we could reset the password
      </h1>
      <ForgotPasswordForm />
    </>
  );
}
