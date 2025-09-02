"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { FileIcon, PlusIcon, SendIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ResizableTextArea } from "@/components/resizable-textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useAddMessage } from "@/hooks/chat";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { IRevalidateTag } from "@/lib/actions/utils";

export const MessageInput: React.FC<
  React.ComponentPropsWithoutRef<"div"> & {
    recieverId: string;
  }
> = withReactQueryProvider(({ recieverId, className, ...rest }) => {
  const [image, setImage] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null); // Send to server
  const [message, setMessage] = React.useState("");

  const { mutate } = useAddMessage();
  return (
    <div
      {...rest}
      className={twMerge(
        "flex flex-col border rounded-lg border-foreground absolute bottom-12 left-1/2 -translate-x-1/2 w-96 lg:w-[600px] px-3 py-2",
        className
      )}
    >
      {image && (
        <div className="size-20 relative rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="Selected image"
            className="absolute object-cover"
            fill
          />
        </div>
      )}
      <ResizableTextArea
        placeholder="Enter your message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className="flex justify-between">
        <Button variant="outline">
          <Label htmlFor="image">
            <FileIcon />
          </Label>
        </Button>
        <Button
          onClick={() => {
            mutate(
              {
                content: message,
                recieverId,
                type: file ? "IMAGE" : "TEXT", // Handle for right now just so it works but switch to a image
              },
              {
                onSuccess: () => {
                  IRevalidateTag("chats");

                  setMessage("");
                  setFile(null);
                  setImage(null);
                },
              }
            );
          }}
        >
          <SendIcon />
        </Button>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target?.files?.[0];

            if (!file) return;

            setFile(file);
            setImage(URL.createObjectURL(file));
          }}
          className="absolute size-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
});
