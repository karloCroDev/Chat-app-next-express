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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordArgs, resetPasswordSchema } from "@repo/schemas";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useResetPassword } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";

export const ResetPasswordForm = withReactQueryProvider(() => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm<ResetPasswordArgs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.get("token") || "",
    },
  });

  const { mutate } = useResetPassword();

  const [successMessage, setSuccessMessage] = React.useState("");

  const onSubmit = (data: ResetPasswordArgs) => {
    mutate(data, {
      onSuccess: ({ success, message }) => {
        if (!success) {
          return setError("root", {
            message,
          });
        }

        setSuccessMessage(message);

        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      },
    });
  };

  console.log(errors);
  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Reset the password</CardTitle>
        <CardDescription>
          Enter your email below to reset the password to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="repeatPassword">Repeat password</Label>
              <Input
                id="repeatPassword"
                type="password"
                placeholder="********"
                {...register("repeatPassword", {
                  required: "Repeat password is required",
                })}
              />
              {errors.repeatPassword && (
                <p className="text-red-500">{errors.repeatPassword.message}</p>
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
