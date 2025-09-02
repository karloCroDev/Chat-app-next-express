"use client";

import * as React from "react";
import { IoCheckmark } from "react-icons/io5";
import { twJoin, twMerge } from "tailwind-merge";

export const ChatMessage: React.FC<
  React.ComponentPropsWithoutRef<"div"> & {
    hasMessageBeSeen: boolean;
    time: Date;
    message: string;
    variant?: "primary" | "outline";
  }
> = ({
  time,
  message,
  hasMessageBeSeen,
  variant = "primary",
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "rounded-2xl px-4 py-2 w-fit max-w-2/3 flex flex-col",
        variant === "primary" &&
          "bg-accent-foreground  text-background ml-auto",
        variant === "outline" && "text-foreground border border-foreground ",
        className
      )}
    >
      <p>{message}</p>
      <div className=" text-sm text-muted-foreground flex gap-2  mt-2 self-end">
        <p>
          {`${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()} | ${time.getHours()}:${time.getMinutes()}`}
        </p>
        <IoCheckmark
          className={twJoin("size-5", hasMessageBeSeen && "text-green-800")}
        />
      </div>
    </div>
  );
};
