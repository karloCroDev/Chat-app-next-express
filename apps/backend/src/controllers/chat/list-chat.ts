import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

// Dodaj u url
export async function listChat(req: Request, res: Response) {
  const username = req.query.username;
  const userId = req.user!.userId;

  if (typeof username !== "string") {
    return res
      .status(400)
      .json({ messgae: "Id is not type of string", success: false });
  }

  try {
    // Karlo maybe I can add this in seperate request and then pass it on frontend the id after it has been loaded! Add this for later
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        image: true,
        bio: true,
        isOnline: true,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ messgae: "User not found", success: false });
    }

    const chats = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: user.id,
          },
          {
            receiverId: userId,
            senderId: user.id,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ chats, ...user });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
