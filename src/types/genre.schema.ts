import { z } from "zod";

export const genreSchema = z.object({
  name: z.string(),
});

export type GenreSchema = z.infer<typeof genreSchema>;
