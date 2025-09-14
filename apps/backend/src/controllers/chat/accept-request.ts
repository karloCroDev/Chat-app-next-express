import { prisma } from "@/src/config/prisma";
import { AcceptRequestArgs, acceptRequestSchema } from "@repo/schemas";
import { Request, Response } from "express";

export async function accpetRequest(req: Request, res: Response) {
  const data: AcceptRequestArgs = req.body;
  const userId = req.user.userId;

  const validateData = acceptRequestSchema.safeParse(data);

  if (!validateData.success)
    return res.status(400).json({ message: validateData.error.message });

  try {
    const friendRequest = await prisma.friendRequest.update({
      where: {
        toUserId_fromUserId: {
          toUserId: userId,
          fromUserId: data.id,
        },
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (!friendRequest) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    await prisma.friendship.create({
      data: {
        content: `${data.username} accepted your friend request. You may now start chat`,
        senderId: data.id,
        receiverId: userId,
      },
    });

    return res
      .status(200)
      .json({ message: "Friends requests successfull and friendsip created" });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
