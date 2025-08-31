import { z } from "zod";

export const listUsersSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  searchValue: z.string().optional(),
});

export type ListUsersArgs = z.infer<typeof listUsersSchema> | undefined;
