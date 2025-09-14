import { Request, Response } from "express";
import { LoginArgs, loginSchema } from "@repo/schemas";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import bcrypt from "bcrypt";
import { prisma } from "@/src/config/prisma";
import { generateTokenAndSetCookie } from "@/src/lib/set-token-cookie";
import { resend } from "@/src/config/resend";

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

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //// Ovo mozda handleaj u funkciji pa returnaj (ima vise smisla jer se koristi u signupu)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: validateData.data.email,
      subject: "Confirm your email address",
      html: `<p>Your code: ${verificationToken}</p>`, // Karlo dodaj shared components i dodaj react email i ondaj dodaj mail
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Error with email", success: false });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: validateData.data.email,
      },
      data: {
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
      },
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "Error with email", success: false });
    }
    ///
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}
