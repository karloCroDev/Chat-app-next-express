import { z } from "zod";

export const settingsSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(16)
      .or(z.literal("")), // CLUTCH

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16)
      .or(z.literal("")),
    bio: z
      .string()
      .min(2, "Bio must be at least 2 characters")
      .max(16)
      .or(z.literal("")),
    image: z
      .string()
      .min(2, "Image must be at least 2 characters")
      .or(z.literal("")),
  })
  .partial()
  .refine(
    (obj) => Object.values(obj).some((v) => v !== undefined && v !== ""),
    { message: "At least one field must be provided", path: ["root"] }
  );

export type SettingsArgs = z.infer<typeof settingsSchema>;
