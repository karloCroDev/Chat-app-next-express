"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginArgs, loginSchema } from "@repo/schemas";
import { useLogin } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { useRouter } from "next/navigation";

export const LoginForm = withReactQueryProvider(() => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    register,
    watch,
  } = useForm<LoginArgs>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = useLogin();
  const onSubmit = async (data: LoginArgs) => {
    mutate(data, {
      onSuccess: ({ errors, success, message }) => {
        if (success) return router.push(`/auth/email-otp?email=${data.email}`);

        setError("root", {
          message,
        });

        if (!errors) return;

        // KARLO ja msm da ja ovo sa servera ne trebam handleati ali za svaki slucaj! (Nije lose da je ti)
        if (errors.email)
          setError("email", {
            message: errors.email,
          });
        if (errors.password)
          setError("password", {
            message: errors.password,
          });
      },
    });
  };

  const values = watch();
  return (
    <div className="flex flex-col gap-6">
      <Card className="w-96 ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input type="password" {...register("password")} />

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {errors.root && (
                  <p className="text-red-500">{errors.root.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !(values.email && values.password)}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "http://localhost:4000/auth/google";
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4 ml-2"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});
