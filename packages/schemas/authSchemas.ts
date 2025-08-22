import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().max(16),
  email: z.email(),
  password: z.string().min(6).max(16),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});
