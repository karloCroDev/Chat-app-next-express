"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";

export const ResetPasswordForm = () => {
  // Search paramaj tokene
  return (
    <form className="flex flex-col gap-4">
      <Input placeholder="Enter your new password" />
      <Input placeholder="Repeat your new password" />
      <Button>Confirm</Button>
    </form>
  );
};
