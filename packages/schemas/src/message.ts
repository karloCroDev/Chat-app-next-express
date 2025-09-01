import { z } from "zod";

export const addMessageSchema = z.object({
  content: z.string(),
  recieverId: z.string(), // Check which type of id does prisma generate
  type: z.enum(["TEXT", "IMAGE"]).default("TEXT"),
});

export type AddMessageArgs = z.infer<typeof addMessageSchema>;
