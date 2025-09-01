import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";
export async function addChat(req: Request, res: Response) {
  const data = req.body;
  const userId = req.user?.userId;

  try {
    const addChat = await prisma.friendship.create({
      data: {
        content: data.content,
        type: data.type || "TEXT",
        senderId: userId,
        receiverId: data.recieverId,
      },
    });

    if (!addChat)
      return res
        .status(400)
        .json({ message: "Error addding chat", success: false });

    return res.status(200).json({ message: "Chat added", success: true });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
