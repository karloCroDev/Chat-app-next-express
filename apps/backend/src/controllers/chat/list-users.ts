import { prisma } from "@/src/config/prisma";
import { ListUsersArgs, listUsersSchema } from "@repo/schemas";
import { Request, Response } from "express";

export async function listUsers(req: Request, res: Response) {
  const data: ListUsersArgs = req.body;

  const validateData = listUsersSchema.safeParse(data);

  if (!validateData.success) {
    return res.status(400);
  }

  const userId = req.user!.userId;

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        FriendRequest: {
          none: {
            fromUserId: userId,
          },
        },
        OR: [
          {
            username: {
              contains: validateData.data.searchValue || "",
            },
          },
          {
            bio: {
              contains: validateData.data.searchValue || "",
            },
          },
        ],
      },

      take: validateData.data.limit,
      skip: validateData.data.searchValue ? 0 : validateData.data.offset,
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
