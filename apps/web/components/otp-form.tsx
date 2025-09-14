"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";

export const OtpForm = withReactQueryProvider(() => {
  const [value, setValue] = React.useState("");

  const { mutate } = useVerifyEmail();
  return (
    <div className="mx-auto w-96 flex items-center mt-4 flex-col">
      <InputOTP maxLength={6} onChange={(val) => setValue(val)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        className="w-full mt-4"
        size="lg"
        onClick={() => mutate({ code: value })}
      >
        Submit
      </Button>
    </div>
  );
});
