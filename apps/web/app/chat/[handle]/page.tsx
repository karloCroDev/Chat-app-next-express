import { ChatMapping } from "@/components/chat-mapping";
import { ChatMessage } from "@/components/chat-message";
import { MessageInput } from "@/components/message-input";
import { OnlineStatusChat } from "@/components/online-status-chat";
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

        <OnlineStatusChat userId={data.id} />
      </div>

      <div className="px-8 py-6 flex flex-col gap-4 ">
        <ChatMapping initialData={data} username={handle} />
      </div>
    </>
  );
}
