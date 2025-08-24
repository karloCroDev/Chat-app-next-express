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
import jwt from "jsonwebtoken";

export async function session(req: Request, res: Response) {
  try {
    const token = req.cookies.auth_token;
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
