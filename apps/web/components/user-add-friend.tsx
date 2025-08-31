"use client ";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ListUsersResponse } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSendRequest } from "@/hooks/sidebar";

export const UserAddFriend: React.FC<ListUsersResponse> = ({
  id,
  bio,
  image,
  username,
}) => {
  const { mutate } = useSendRequest();

  return (
    <div className="flex gap-3 items-center ">
      <Avatar className="size-7 rounded">
        {image && <AvatarImage src={image} />}
        <AvatarFallback className="rounded-lg">
          {/* Karlo: Ovo dodaj kasnije u komponentu */}
          {username
            .split(" ")
            .map((l) => l[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <p>{username}</p>
        {bio && (
          <p className="text-xs text-muted-foreground line-clamp-1">{bio}</p>
        )}
      </div>

      <Button
        className="ml-auto"
        size="sm"
        onClick={() => {
          mutate(id);

          console.log("Request sent");
        }}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};
