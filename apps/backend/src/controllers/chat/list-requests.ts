import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";

export async function listRequests(req: Request, res: Response) {
  try {
    const requests = await prisma.friendRequest.findMany({
      where: {
        toUserId: req.user!.userId,
      },
      include: {
        fromUser: {
          select: {
            username: true,
            bio: true,
            email: true,
            image: true,
            isOnline: true,
          },
        },
      },
    });

    return res.status(200).json(requests.map((request) => request.fromUser));
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
