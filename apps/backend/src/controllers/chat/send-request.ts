import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function sendRequest(req: Request, res: Response) {
  const reciverId = req.body.id;

  if (typeof reciverId !== "string") return res.status(400);

  const userId = req.user?.userId;

  try {
    await prisma.friendRequest.create({
      data: {
        fromUserId: userId!,
        toUserId: reciverId,
        status: "PENDING",
      },
    });

    return res.status(200).json({ message: "Request sent", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}
