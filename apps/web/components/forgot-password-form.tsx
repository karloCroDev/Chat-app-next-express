"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordArgs, forgotPasswordSchema } from "@repo/schemas";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";

export const ForgotPasswordForm = withReactQueryProvider(() => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    register,
    watch,
  } = useForm<ForgotPasswordArgs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate } = useForgotPassword();
  const [successMessage, setSuccessMessage] = React.useState("");
  const onSubmit = (data: ForgotPasswordArgs) => {
    mutate(data, {
      onSuccess: ({ success, message }) => {
        if (!success) {
          return setError("root", {
            message,
          });
        }

        console.log(message);
        setSuccessMessage(message);
      },
    });
  };
  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Forgot the password</CardTitle>
        <CardDescription>
          Enter your email below to reset the password to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button>Submit</Button>

              {errors.root && (
                <p className="text-red-500">{errors.root.message}</p>
              )}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
});
