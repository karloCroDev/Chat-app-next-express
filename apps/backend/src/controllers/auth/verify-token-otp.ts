import { prisma } from "@/src/config/prisma";
import { generateTokenAndSetCookie } from "@/src/lib/set-token-cookie";
import { verifyEmail } from "@repo/schemas";
import { Request, Response } from "express";

export async function verifyTokenOtp(req: Request, res: Response) {
  const data = req.body;

  const { data: validateData, success } = verifyEmail.safeParse(data);

  console.log(validateData);
  if (!success) {
    return res.status(400).json({ message: "Invalid data", success: false });
  }

  const user = await prisma.user.findUnique({
    where: {
      verificationToken: validateData.code,
      verificationTokenExpiresAt: {
        gt: Date.now(),
      },
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid code", success: false });
  }

  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verificationToken: null,
      verificationTokenExpiresAt: null,
    },
  });

  if (!userUpdated) {
    return res.status(200).json({
      message: "User verified successfully",
      success: false,
    });
  }

  generateTokenAndSetCookie({
    res,
    userId: user.id,
    role: user.role,
  });

  return res.status(200).json({
    success: true,
    message: "User is verified successfully",
  });
}
