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
import { TrashIcon } from "lucide-react";

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
    watch,
  } = useForm<SettingsArgs>({
    resolver: zodResolver(settingsSchema),
  });

  const { mutate } = useUpdateUser();

  const [message, setMessage] = React.useState("");
  const [currImage, setCurrImage] = React.useState<string | undefined>(image);

  const [file, setFile] = React.useState<File | undefined>(undefined);

  const onSubmit = async (data: SettingsArgs) => {
    mutate(
      { data, file },
      {
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
      }
    );
  };

  const values = watch();

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
              <Label htmlFor="image" className="cursor-pointer">
                <Avatar className="rounded-full size-36 lg:size-50 border object-cover relative">
                  <AvatarImage
                    src={currImage ? currImage : undefined} // Passing underfined because of fallback (under condtional rendering without AvatarImage it doesn't work)
                    alt={username}
                    className="object-cover object-center w-full h-full"
                  />

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

                  if (!file) return;

                  onChange({
                    filename: file.name,
                    contentType: file.type,
                    size: file.size,
                  });
                  setCurrImage(URL.createObjectURL(file));
                  setFile(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              {currImage && (
                <Controller
                  name="deleteImage"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Button
                      className="absolute right-2 bottom-2 rounded-full"
                      variant="secondary"
                      onClick={() => {
                        onChange(image);
                        setCurrImage(undefined);
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  )}
                />
              )}
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

      <Button
        className="mr-auto"
        disabled={
          !isDirty ||
          (!values.password &&
            !values.username &&
            !values.bio &&
            !values.image &&
            !values.deleteImage)
        }
      >
        Update info
      </Button>
    </form>
  );
});
