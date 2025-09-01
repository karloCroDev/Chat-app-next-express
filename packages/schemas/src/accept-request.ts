import { z } from "zod";

export const acceptRequestSchema = z.object({
  username: z.string(),
  id: z.uuid(),
});

export type AcceptRequestArgs = z.infer<typeof acceptRequestSchema>;
