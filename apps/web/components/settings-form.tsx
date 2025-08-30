"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Controller } from "react-hook-form";

export const SettingsForm: React.FC<{
  username: string;
  bio: string | undefined;
  image: string | undefined;
}> = withReactQueryProvider(({ username, bio, image }) => {
  const {
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    register,
    setError,
    control,
  } = useForm<SettingsArgs>({
    resolver: zodResolver(settingsSchema),
  });

  const { mutate } = useUpdateUser();

  const [message, setMessage] = React.useState("");

  const onSubmit = async (data: SettingsArgs) => {
    const formData = new FormData();
    if (data.username) formData.append("username", data.username);
    if (data.password) formData.append("password", data.password);
    if (data.bio) formData.append("bio", data.bio);
    if (data.image instanceof File) formData.append("image", data.image);

    mutate(formData, {
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

  const [currImage, setCurrImage] = React.useState<string | null | undefined>(
    image
  );

  console.log(currImage);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col gap-6"
    >
      <div className="self-center text-center">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="relative">
              <Label htmlFor="image">
                <Avatar className="rounded-full size-36 lg:size-50 border object-cover relative">
                  {currImage && (
                    <AvatarImage
                      src={currImage}
                      alt={username}
                      className="object-cover object-center w-full h-full"
                    />
                  )}

                  <AvatarFallback className="text-2xl">
                    {username!.split(" ").map((word) => word[0])}
                  </AvatarFallback>
                </Avatar>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  onChange(file);
                  setCurrImage(file ? URL.createObjectURL(file) : null);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        />
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
});
