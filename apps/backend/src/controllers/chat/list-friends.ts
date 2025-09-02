import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function listFriends(req: Request, res: Response) {
  try {
    // Rather make self relation and then add friends, than hadnling like this!
    const user = req.user?.userId;
    const friends = await prisma.user.findMany({
      where: {
        OR: [
          {
            FriendRequestSent: {
              some: { status: "ACCEPTED", toUserId: user },
            },
          },
          // {
          //   FriendRequestSent: {
          //     some: { status: "ACCEPTED", fromUserId: user },
          //   },
          // },
        ],
      },
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
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
