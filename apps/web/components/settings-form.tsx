"use client";

// External packages
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsArgs, settingsSchema } from "@repo/schemas";
import { useUpdateUser } from "@/hooks/settings";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { IRevalidateTag } from "@/lib/actions/utils";

export const SettingsForm: React.FC<SettingsArgs> = withReactQueryProvider(
  ({ username, bio }) => {
    const {
      handleSubmit,
      formState: { isDirty, errors },
      reset,
      register,
      setError,
    } = useForm<SettingsArgs>({
      resolver: zodResolver(settingsSchema),
    });

    const { mutate } = useUpdateUser();

    const [message, setMessage] = React.useState("");

    const onSubmit = async (data: SettingsArgs) => {
      mutate(data, {
        onSuccess: ({ errors, message, success }) => {
          if (success) {
            setMessage(message);
            IRevalidateTag("session");
            return reset();
          }

          if (!errors) return;

          // KARLO ja msm da ja ovo sa servera ne trebam handleati ali za svaki slucaj! (Nije lose da je ti)
          if (errors.username)
            setError("username", {
              message: errors.username,
            });
          if (errors.password)
            setError("password", {
              message: errors.password,
            });
        },
      });
    };

    console.log(isDirty);
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-6"
      >
        <div className="self-center text-center">
          <div className="rounded-full size-36 lg:size-50  border" />
          <h4 className="mt-4 font-bold text-2xl">{username}</h4>
          <p>{bio}</p>
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
            placeholder={username ? username : "Enter the new username"}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 mt-2">{errors.username.message}</p>
          )}
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
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
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
            placeholder={bio ? bio : "Enter the new bio"}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-red-500 mt-2">{errors.bio.message}</p>
          )}
        </div>
        {message && <p className="mr-auto text-green-500">{message}</p>}

        <Button className="mr-auto" disabled={!isDirty}>
          Update info
        </Button>
      </form>
    );
  }
);
