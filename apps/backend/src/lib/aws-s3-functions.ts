import { s3 } from "@/src/config/aws";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function getImageKeyFromUser(userId: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Prefix: userId,
  });

  const { Contents = [] } = await s3.send(command);

  return Contents.map((image) => image.Key);
}

export async function getUserPresignedUrls(userId: string) {
  try {
    const imageKeys = await getImageKeyFromUser(userId);
    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: key,
        });

        return getSignedUrl(s3, command, { expiresIn: 3600 });
      })
    );

    return presignedUrls;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export function getKeyFromUrl(url: string): string {
  const urlObj = new URL(url);
  return decodeURIComponent(urlObj.pathname.substring(1));
}
