import { z } from "zod";

export const acceptRequestSchema = z.object({
  username: z.string(),
  id: z.string(),
});

export type AcceptRequestArgs = z.infer<typeof acceptRequestSchema>;
