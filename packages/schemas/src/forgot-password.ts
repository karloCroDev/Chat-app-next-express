import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordArgs = z.infer<typeof forgotPasswordSchema>;
