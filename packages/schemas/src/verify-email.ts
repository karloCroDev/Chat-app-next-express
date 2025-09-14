import { z } from "zod";

export const verifyEmail = z.object({
  code: z.string().min(6).max(6),
  email: z.email(),
});

export type VerifyEmailArgs = z.infer<typeof verifyEmail>;
