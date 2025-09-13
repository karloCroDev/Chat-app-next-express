import { OtpForm } from "@/components/otp-form";

export default async function TokenPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-balance text-center">
        Please enter the six digit code that we sent on your email address:
      </h1>
      <OtpForm />
    </>
  );
}
