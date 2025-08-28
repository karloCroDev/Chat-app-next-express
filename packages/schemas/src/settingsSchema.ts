import { z } from "zod";
import { registerSchema } from "@/schemas/src/authSchemas";

const pickSchema = registerSchema.pick({ username: true, password: true });

export const settingsSchema = pickSchema
  .extend(
    z.object({
      bio: z.string().min(2).max(16),
      image: z.string(),
    })
  )
  .partial()
  .refine(
    (obj) => Object.values(obj).some((v) => v !== undefined && v !== ""),
    { message: "At least one field must be provided" }
  );

export type SettingsSchema = z.infer<typeof settingsSchema>;
