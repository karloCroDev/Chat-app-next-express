"use client";

// External packages
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema, settingsSchema } from "@repo/schemas";

export const SettingsForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    register,
    watch,
  } = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
  });

  //   const { mutate } = useLogin();
  const onSubmit = async (data: SettingsSchema) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col gap-6"
    >
      <div className="self-center text-center">
        <div className="rounded-full size-36 lg:size-50  border" />
        <h4 className="mt-4 font-bold text-2xl">Karlo</h4>
      </div>

      <div>
        <Label htmlFor="username">
          <p className="text-xl font-medium underline underline-offset-4">
            Username
          </p>
        </Label>

        <Input
          id="username"
          className=" flex-1 mt-4"
          placeholder="Enter the new username"
        />
      </div>
      <div>
        <Label htmlFor="password">
          <p className="text-xl font-medium underline underline-offset-4">
            Password
          </p>
        </Label>

        <Input
          id="password"
          className=" flex-1 mt-4"
          placeholder="Enter the new password"
        />
      </div>
      <div>
        <Label htmlFor="bio">
          <p className="text-xl font-medium underline underline-offset-4">
            Bio
          </p>
        </Label>

        <Input
          id="bio"
          className=" flex-1 mt-4"
          placeholder="Enter the new bio"
        />
      </div>

      <Button className="mr-auto"> Update info</Button>
    </form>
  );
};
