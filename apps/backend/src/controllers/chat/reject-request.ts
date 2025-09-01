import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function rejectRequest(req: Request, res: Response) {
  const id: string = req.body.id;
  const userId = req.body.userId;

  if (typeof id !== "string") return;

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
      return res.status(400);
    }

    return res.status(200);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
