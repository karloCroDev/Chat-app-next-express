import { prisma } from "@/src/config/prisma";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import { loginSchema, settingsSchema, SettingsArgs } from "@repo/schemas";
import { type Response, Request } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getKeyFromUrl } from "@/src/lib/aws-s3-functions";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/src/config/aws";

export async function settings(req: Request, res: Response) {
  const data: SettingsArgs = { ...req.body };

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

  if (validateData.data.deleteImage) {
    try {
      const key = getKeyFromUrl(validateData.data.deleteImage);
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      });

      // Deleting the image
      const success = await s3.send(command);

      console.log(success);

      payload.image = ""; // Will pass new image if is there in next if statment
    } catch (error) {
      throw new Error("Failed to delete the image");
    }
  }

  let presignedUrl = "";
  if (validateData.data.image) {
    try {
      const imageName = `${Date.now()}_${validateData.data.image.filename}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: imageName,
        ContentType: validateData.data.image.contentType,
        ContentLength: validateData.data.image.size,
      });

      presignedUrl = await getSignedUrl(s3, command, {
        expiresIn: 300,
      });

      payload.image = imageName;
    } catch (error) {
      throw new Error("Failed to upload the image");
    }
  }

  await prisma.user.update({
    where: {
      id: req.user.userId, // Getting from middleware
    },
    data: payload,
  });

  const response: {
    success: boolean;
    message: string;
    presignedUrl?: string;
  } = {
    success: true,
    message: "Settings updated successfully",
  };

  if (presignedUrl) response.presignedUrl = presignedUrl;

  return res.status(200).json(response);
}
