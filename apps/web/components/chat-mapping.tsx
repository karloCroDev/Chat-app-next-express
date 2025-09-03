"use client";

import * as React from "react";

import { ChatResponse } from "@repo/types";
import { useListChats } from "@/hooks/chat";
import { ChatMessage } from "@/components/chat-message";
import { MessageInput } from "@/components/message-input";
import { useSocketContext } from "@/hooks/context/SocketContext";

export const ChatMapping: React.FC<{
  username: string;
  initialData: ChatResponse;
}> = ({ initialData, username }) => {
  const { data } = useListChats({ initialData, username });
  if (!data) {
    return (
      <p>There are no chats, please start typing to get access to chats</p>
    );
  }

  const { socketGlobal } = useSocketContext();

  const [chats, setChats] = React.useState(data.chats);

  React.useEffect(() => {
    if (!socketGlobal) return;
    socketGlobal.on("new-chat", (newChat) =>
      setChats((prev) => [...prev, newChat])
    );

    return () => {
      socketGlobal.off("new-message");
    };
  }, [chats, setChats, socketGlobal]);

  console.log(chats);
  return (
    <>
      {chats.map((chat) => (
        <ChatMessage
          key={chat.id}
          hasMessageBeSeen={chat.status === "READ"}
          variant={chat.receiverId === data.id ? "primary" : "outline"}
          message={chat.content}
          time={new Date(chat.createdAt)}
        />
      ))}

      <MessageInput recieverId={data.id} />
    </>
  );
};
