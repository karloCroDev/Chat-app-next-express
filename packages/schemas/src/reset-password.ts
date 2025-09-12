import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8).max(16),
  repeatPassword: z.string().min(8).max(16),
});

export type ResetPasswordArgs = z.infer<typeof resetPasswordSchema>;
