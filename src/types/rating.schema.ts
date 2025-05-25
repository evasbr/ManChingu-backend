import { z } from "zod";

export const ratingSchema = z.object({
  rating: z
    .number()
    .min(0, "Minimal rating is 0")
    .max(5, "Maximum rating is 5"),
  review_text: z.string().nullable().optional(),
});

export const ratingKeySchema = z.object({
  key: z.string().optional().nullable(),
});

export type RatingSchema = z.infer<typeof ratingSchema>;
export type RatingKeySchema = z.infer<typeof ratingKeySchema>;
