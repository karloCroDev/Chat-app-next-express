import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function rejectRequest(req: Request, res: Response) {
  const id: string = req.body.id;
  const userId = req.user!.userId;

  if (typeof id !== "string") return res.status(400);

  try {
    const friendRequest = await prisma.friendRequest.delete({
      where: {
        toUserId_fromUserId: {
          toUserId: userId,
          fromUserId: id,
        },
      },
    });

    if (!friendRequest) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    return res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
