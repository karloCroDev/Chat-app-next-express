import { prisma } from "@/src/config/prisma";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import { loginSchema, settingsSchema, SettingsArgs } from "@repo/schemas";
import { type Response, Request } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
import { s3 } from "@/src/config/aws";

export async function settings(req: Request, res: Response) {
  const data: SettingsArgs = req.body;
  const file = req.file;

  const validateData = settingsSchema.safeParse(data);

  if (!validateData.success) {
    return res.json({ errors: zodErrorDetecter(validateData.error) });
  }

  const payload: Partial<User> = {};

  if (validateData.data.password) {
    const hashedPassword = bcrypt.hashSync(validateData.data.password, 10);
    payload.password = hashedPassword;
  }

  if (validateData.data.username) payload.username = validateData.data.username;

  if (validateData.data.bio) payload.bio = validateData.data.bio;

  // if (validateData.data.image) payload.image = validateData.data.image;

  await prisma.user.update({
    where: {
      id: req.user?.userId,
    },
    data: payload,
  });

  return res.status(200).json({
    success: true,
    message: "Settings updated successfully",
  });
}
