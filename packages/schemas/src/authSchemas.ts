import { z } from "zod";

export const registerSchema = z.object({
  username: z.string("Username is required").max(16),
  email: z.email(),
  password: z.string("Password is required").min(8).max(16),
});
export type RegisterArgs = z.infer<typeof registerSchema>;
export const loginSchema = z.object({
  email: z.email(),
  password: z.string("Password is required").min(8).max(16),
});
export type LoginArgs = z.infer<typeof loginSchema>;
