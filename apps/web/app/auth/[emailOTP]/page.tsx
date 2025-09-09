import { OtpForm } from "@/components/otp-form";

interface PageProps {
  props: Promise<{
    emailOTP: string;
  }>;
}
export default async function TokenPage({ props }: PageProps) {
  const { emailOTP } = await props;
  return (
    <>
      <h1 className="text-2xl font-bold ">
        Please enter the six digit code that we sent on your email address:
      </h1>
      <h4 className="text-xl font-bold mt-4">{emailOTP}</h4>
      <OtpForm />
    </>
  );
}
