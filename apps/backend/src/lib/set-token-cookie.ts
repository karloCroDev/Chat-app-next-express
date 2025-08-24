import jwt from "jsonwebtoken";
import { Response } from "express";

export async function generateTokenAndSetCookie({
  res,
  userId,
}: {
  res: Response;
  userId: string;
}) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/", // <--- ensure it’s global
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
}
