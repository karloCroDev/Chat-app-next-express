import express from "express";
import { Router, Request, Response } from "express";
import {
  registerSchema,
  RegisterArgs,
  LoginArgs,
  loginSchema,
} from "@repo/schemas";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import bcrypt from "bcrypt";
import { prisma } from "@/src/config/prisma";
import { generateTokenAndSetCookie } from "@/src/lib/set-token-cookie";

export async function register(req: Request, res: Response) {
  try {
    const data: RegisterArgs = req.body;

    const validateData = registerSchema.safeParse(data);

    if (!validateData.success) {
      return res.json({
        errors: zodErrorDetecter(validateData.error),
      });
    }

    const hashedPassword = bcrypt.hashSync(validateData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: validateData.data.username,
        email: validateData.data.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Already existing user, please login!",
        success: false,
      });
    }

    generateTokenAndSetCookie({
      res,
      userId: user.id,
      role: user.role,
    });

    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
}
