import { prisma } from "@/src/config/prisma";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import { loginSchema, settingsSchema, SettingsArgs } from "@repo/schemas";
import { type Response, Request } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { s3 } from "@/src/config/aws";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getKeyFromUrl } from "@/src/lib/getKeyFromUrl";

export async function settings(req: Request, res: Response) {
  const file = req.file;
  const data: SettingsArgs = { ...req.body, image: file };

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

  if (validateData.data.imageUrl) {
    try {
      const key = getKeyFromUrl(validateData.data.imageUrl);
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      });

      const success = await s3.send(command);

      console.log(success);

      payload.image = ""; // Will pass new image if is there in next if statment
    } catch (error) {
      throw new Error("Failed to delete the image");
    }
  }

  if (validateData.data.image && file) {
    try {
      const imageName = `${Date.now()}_${file.originalname}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await s3.send(command);
      const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageName}`;

      payload.image = imageUrl;
    } catch (error) {
      throw new Error("Failed to upload the image");
    }
  }

  await prisma.user.update({
    where: {
      id: req.user!.userId, // Getting from middleware
    },
    data: payload,
  });

  return res.status(200).json({
    success: true,
    message: "Settings updated successfully",
  });
}
