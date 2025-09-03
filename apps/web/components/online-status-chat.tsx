"use client";

import { useSocketContext } from "@/hooks/context/SocketContext";
// External packages
import * as React from "react";
import { twJoin } from "tailwind-merge";

export const OnlineStatusChat: React.FC<{ userId: string }> = ({ userId }) => {
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(userId);

  return (
    <>
      <div
        className={twJoin(
          "rounded-full bg-green-500 size-4 ml-auto",
          isOnline ? "bg-green-500 " : "bg-red-500 "
        )}
      />
      <p>{isOnline ? "online " : "offline"}</p>
    </>
  );
};
