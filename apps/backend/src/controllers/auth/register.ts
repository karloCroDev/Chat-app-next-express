import express from "express";
import { Request, Response } from "express";
import {
  registerSchema,
  RegisterArgs,
  LoginArgs,
  loginSchema,
} from "@repo/schemas";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import bcrypt from "bcrypt";
import { prisma } from "@/src/config/prisma";
import { resend } from "@/src/config/resend";

export async function register(req: Request, res: Response) {
  try {
    const data: RegisterArgs = req.body;

    const validateData = registerSchema.safeParse(data);

    if (!validateData.success) {
      return res.json({
        errors: zodErrorDetecter(validateData.error),
      });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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

    const hashedPassword = bcrypt.hashSync(validateData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: validateData.data.username,
        email: validateData.data.email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Already existing user, please login!",
        success: false,
      });
    }

    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
}
