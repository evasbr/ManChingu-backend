import { z } from "zod";

export const comicStatusEnum = z.enum(["COMPLETED", "ON_GOING"]);

export const ComicSchema = z.object({
  id_comic: z.string(),
  name: z.string(),
  synopsis: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  artist: z.string().optional().nullable(),
  status: comicStatusEnum.optional(),
  poster: z.string(),
  genre: z.array(z.string()),

  deleted_at: z.date().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  rating: z.number().min(1, "Minium rating is 1").max(5, "Maximum rating is 5"),
  bookmarked: z.number(),
});

export const comicCreate = ComicSchema.omit({
  id_comic: true,
  deleted_at: true,
  created_at: true,
  updated_at: true,
  rating: true,
  bookmarked: true,
  genre: true,
});

export const comicUpdate = ComicSchema.omit({
  id_comic: true,
  deleted_at: true,
  created_at: true,
  updated_at: true,
  rating: true,
  bookmarked: true,
  genre: true,
});

export const comicResponse = ComicSchema.omit({ deleted_at: true });

export type ComicCreate = z.infer<typeof comicCreate>;
export type ComicResponse = z.infer<typeof comicResponse>;
export type ComicUpdate = z.infer<typeof comicUpdate>;
