import { prisma } from "@/src/config/prisma";
import { AddMessageArgs, addMessageSchema } from "@repo/schemas";
import { Request, Response } from "express";

export async function addChat(req: Request, res: Response) {
  const data: AddMessageArgs = req.body;
  const userId = req.user!.userId;

  console.log(data);
  const validateData = addMessageSchema.safeParse(data);
  if (!validateData.success) return res.status(400).json(validateData.error);

  try {
    const addChat = await prisma.friendship.create({
      data: {
        content: validateData.data.content,
        type: validateData.data.type,
        senderId: userId,
        receiverId: validateData.data.recieverId,
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
