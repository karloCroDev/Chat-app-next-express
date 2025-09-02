import { UsersSidebar } from "@repo/types/src/users-sidebar";

export type ChatResponse = {
  chats: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: "DELIVERED" | "SENT" | "READ";
    content: string;
    type: "TEXT" | "IMAGE";
    senderId: string;
    receiverId: string;
  }[];
} & UsersSidebar;
