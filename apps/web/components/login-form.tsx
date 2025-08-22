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

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    register,
    watch,
  } = useForm<LoginArgs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginArgs) => {};

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
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input type="password" {...register("password")} />

                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !(values.email && values.password)}
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
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
};
