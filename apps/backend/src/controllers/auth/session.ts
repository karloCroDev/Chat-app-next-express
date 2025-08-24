import { Request, Response } from "express";
import { prisma } from "@/src/config/prisma";
import jwt from "jsonwebtoken";

export async function session(req: Request, res: Response) {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "User is not logged in",
      });
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
}
