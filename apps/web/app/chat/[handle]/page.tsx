import { ChatMessage } from "@/components/chat-message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DmsPage() {
  return (
    <>
      <div className="border-b w-full flex items-center px-8 py-6 gap-4">
        <Avatar className="size-10 rounded-full">
          <AvatarImage />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <h4 className="text-2xl  font-semibold">Karlo</h4>

        <div className="rounded-full bg-green-500 size-4 ml-auto" />
        <p>Online</p>
      </div>

      <div className="px-8 py-6">
        <ChatMessage
          hasMessageBeSeen
          variant="outline"
          message={`Lorem ipsum dolor sit amet consectetur adipisicing elit. A maxime cum
                magni, corporis nesciunt praesentium asperiores neque. Neque nesciunt
                deleniti sint quasi labore exercitationem tempora consequuntur soluta
                repudiandae. Animi, reprehenderi`}
        />
      </div>
    </>
  );
}
