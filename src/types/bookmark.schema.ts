import { z } from "zod";

export const bookmarkStatus = z.enum([
  "COMPLETED",
  "READING",
  "DROPPED",
  "PLAN_TO_READ",
]);

export type BookmarkStatus = z.infer<typeof bookmarkStatus>;

export const bookmarkStatusQuerySchema = z.object({
  status: bookmarkStatus.optional().nullable(),
});

export const bookmarkQuerySchema = z
  .object({
    status: bookmarkStatus.optional().nullable(),
  })
  .extend({
    key: z.string().nullable().optional(),
  });
