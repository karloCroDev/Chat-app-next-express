"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyEmail } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export const OtpForm = withReactQueryProvider(() => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutate } = useVerifyEmail();
  return (
    <div className="mx-auto w-96 flex items-center mt-4 flex-col">
      <InputOTP
        maxLength={6}
        onChange={(val) => {
          if (val.length === 6) {
            mutate(
              { code: val, email: searchParams.get("email") || "" },
              {
                onSuccess: () => {
                  router.push("/chat");
                },
              }
            );
          }
        }}
      >
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
    </div>
  );
});
