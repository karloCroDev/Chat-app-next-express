import { type Response } from "express";

export async function logout(res: Response) {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}
