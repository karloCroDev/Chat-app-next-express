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
import { RegisterArgs, registerSchema } from "@repo/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    register,
    watch,
  } = useForm<RegisterArgs>({
    resolver: zodResolver(registerSchema),
  });

  const values = watch();
  const onSubmit = async (data: RegisterArgs) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-6 ">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign up to your account</CardTitle>
          <CardDescription>
            Enter your credential and start exploring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="*******"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isSubmitting ||
                    !(values.username && values.email && values.password)
                  }
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm ">
              Already have an account?
              <Link href="/login" className="underline underline-offset-4 ml-2">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
