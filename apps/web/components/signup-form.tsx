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
import { useRegister } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { withReactQueryProvider } from "@/lib/config/react-query";

export const SignupForm = withReactQueryProvider(() => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
    register,
    watch,
  } = useForm<RegisterArgs>({
    resolver: zodResolver(registerSchema),
  });

  const values = watch();

  const { mutate } = useRegister();

  const onSubmit = async (data: RegisterArgs) => {
    mutate(data, {
      onSuccess: ({ errors, success, message }) => {
        if (success) return router.push("/chat");
        console.log(data);
        setError("root", {
          message,
        });

        if (!errors) return;

        // KARLO ja msm da ja ovo sa servera ne trebam handleati ali za svaki slucaj! (Nije lose da je to sada tu)
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
                  Signup
                </Button>
                <Button variant="outline" className="w-full">
                  Signup with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm ">
              Already have an account?
              <Link
                href="/auth/login"
                className="underline underline-offset-4 ml-2"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});
