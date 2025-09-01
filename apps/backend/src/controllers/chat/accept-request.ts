import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function accpetRequest(req: Request, res: Response) {
  const id: string = req.body.id;
  const userId = req.user!.userId;

  console.log(req.body.id);
  // if (typeof id !== "string") return res.status(400);
  try {
    const friendRequest = await prisma.friendRequest.update({
      where: {
        toUserId_fromUserId: {
          toUserId: userId,
          fromUserId: id,
        },
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (!friendRequest) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    return res.status(200).json({ message: "Friend request not found" });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
