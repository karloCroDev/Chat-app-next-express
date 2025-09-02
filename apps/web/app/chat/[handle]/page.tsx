import { ChatMessage } from "@/components/chat-message";
import { MessageInput } from "@/components/message-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { listChat } from "@/lib/actions/chats";
import { twJoin } from "tailwind-merge";

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function DmsPage({ params }: PageProps) {
  const { handle } = await params;
  const data = await listChat(handle);

  if (!data) return;

  return (
    <>
      <div className="border-b w-full flex items-center px-8 py-6 gap-4">
        <Avatar className="size-10 rounded-full">
          <AvatarImage />
          <AvatarFallback className="rounded-lg">
            {data.username
              .split(" ")
              .map((item) => item[0]?.toUpperCase())
              .join()}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-2xl  font-semibold">{data.username}</h4>

        <div
          className={twJoin(
            "rounded-full bg-green-500 size-4 ml-auto",
            data.isOnline ? "bg-green-500 " : "bg-red-500 "
          )}
        />
        <p>{data.isOnline ? "online " : "offline"}</p>
      </div>

      <div className="px-8 py-6 flex flex-col gap-4 ">
        {data.chats.map((chat) => (
          <ChatMessage
            key={chat.id}
            hasMessageBeSeen={chat.status === "READ"}
            variant={chat.receiverId === data.id ? "primary" : "outline"}
            message={chat.content}
            time={new Date(chat.createdAt)}
          />
        ))}

        <MessageInput recieverId={data.id} />
      </div>
    </>
  );
}
