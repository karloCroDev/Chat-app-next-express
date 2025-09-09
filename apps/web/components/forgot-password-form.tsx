"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";

export const ForgotPasswordForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <Input placeholder="Enter your email" />
      <Button>Send message</Button>
    </form>
  );
};
