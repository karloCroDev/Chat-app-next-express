import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function listFriends(req: Request, res: Response) {
  try {
    // Rather make self relation and then add friends, than hadnling like this!
    const userId = req.user.userId;
    const friends = await prisma.user.findMany({
      where: {
        OR: [
          {
            FriendRequestSent: {
              some: { status: "ACCEPTED", toUserId: userId },
            },
          },
          {
            FriendRequestRecieved: {
              some: { status: "ACCEPTED", fromUserId: userId },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        image: true,
        bio: true,
        isOnline: true,
      },
    });

    return res.status(200).json(friends);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
