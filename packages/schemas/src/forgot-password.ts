import { z } from "zod";

export const forgotEmailSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordArgs = z.infer<typeof forgotEmailSchema>;
