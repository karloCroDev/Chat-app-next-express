"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { UsersSidebar } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useAccpectRequest,
  useRejectRequest,
  useSendRequest,
} from "@/hooks/sidebar";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SidebarUser: React.FC<
  UsersSidebar & {
    isRequest?: boolean;
    isFriend?: boolean;
  }
> = ({ id, bio, image, username, isRequest = false, isFriend = false }) => {
  const { mutate: sendRequestMutate } = useSendRequest();
  const { mutate: acceptRequestMutate } = useAccpectRequest();
  const { mutate: rejectRequestMutate } = useRejectRequest();

  const router = useRouter();
  console.log(id);

  const LinkOrDiv = isFriend ? Link : "div";
  return (
    <LinkOrDiv
      href={`/chat/${username}`}
      className="flex gap-3 items-center"
      onClick={() => {
        if (isFriend) router.push(`/chat/${username}`);
      }}
    >
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

      {isFriend ? null : !isRequest ? (
        <Button
          className="ml-auto"
          size="sm"
          onClick={() => {
            sendRequestMutate(id);

            console.log("Request sent");
          }}
        >
          <PlusIcon className="size-4" />
        </Button>
      ) : (
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              acceptRequestMutate({
                id,
                username,
              })
            }
          >
            <IoCheckmarkCircle />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => rejectRequestMutate(id)}
          >
            <TrashIcon />
          </Button>
        </div>
      )}
    </LinkOrDiv>
  );
};
