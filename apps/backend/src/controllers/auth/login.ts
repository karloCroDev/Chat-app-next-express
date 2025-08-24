import { Request, Response } from "express";
import { LoginArgs, loginSchema } from "@repo/schemas";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import bcrypt from "bcrypt";
import { prisma } from "@/src/config/prisma";
import { generateTokenAndSetCookie } from "@/src/lib/set-token-cookie";

export async function login(req: Request, res: Response) {
  try {
    const data: LoginArgs = req.body;
    const validateData = loginSchema.safeParse(data);

    if (!validateData.success) {
      return res.status(400).json({
        errors: zodErrorDetecter(validateData.error),
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validateData.data.email,
      },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid email", success: false });

    const passwordIsValid = bcrypt.compareSync(
      validateData.data.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(400).json({ message: "Invalid password" });

    generateTokenAndSetCookie({
      res,
      userId: user.id,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}
