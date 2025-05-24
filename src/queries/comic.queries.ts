import prisma from "./prisma.js";
import {
  comicCreate,
  ComicCreate,
  comicResponse,
  ComicUpdate,
} from "../types/comic.schema.js";
import z from "zod";
import paginate from "./pagination.queries.js";

const comicSelected = {
  id_comic: true,
  name: true,
  synopsis: true,
  author: true,
  artist: true,
  status: true,
  poster: true,
  comicGenre: {
    select: {
      genre: {
        select: {
          name: true,
        },
      },
    },
  },
  created_at: true,
  updated_at: true,
  rating: true,
  bookmarked: true,
};

type RawComicFromPrisma = {
  id_comic: string;
  name: string;
  synopsis?: string | null;
  author?: string | null;
  artist?: string | null;
  status: "ON_GOING" | "COMPLETED";
  poster: string;
  comicGenre: { genre: { name: string } }[];
  created_at: Date;
  updated_at: Date;
  rating: number;
  bookmarked: number;
};

type FlattenedComic = z.infer<typeof comicResponse>;

export const flattenComic = (comic: RawComicFromPrisma): FlattenedComic => {
  return {
    id_comic: comic.id_comic,
    name: comic.name,
    synopsis: comic.synopsis ?? null,
    author: comic.author ?? null,
    artist: comic.artist ?? null,
    status: comic.status,
    poster: comic.poster,
    genre: comic.comicGenre.map((cg) => cg.genre.name),
    created_at: comic.created_at,
    updated_at: comic.updated_at,
    rating: comic.rating,
    bookmarked: comic.bookmarked,
  };
};

class Comic {
  addNewComic = async (comic: ComicCreate) => {
    const data = await prisma.comic.create({
      data: comic,
      select: comicSelected,
    });

    return flattenComic(data);
  };

  editComic = async (comic: ComicUpdate, id_comic: string) => {
    const data = await prisma.comic.update({
      where: {
        id_comic,
      },
      data: comic,
      select: comicSelected,
    });

    return flattenComic(data);
  };

  deleteComic = async (id_comic: string) => {
    const data = await prisma.comic.update({
      where: {
        id_comic,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return data;
  };

  getComicById = async (id_comic: string) => {
    const data = await prisma.comic.findUnique({
      where: {
        id_comic,
      },
      select: comicSelected,
    });

    return data;
  };

  getAllComic = async (
    page: string | undefined,
    limit: string | undefined,
    key: string | null | undefined
  ) => {
    const data = await paginate({
      modelName: "Comic",
      page,
      pageSize: limit,
      select: comicSelected,
      where: {
        ...(key
          ? {
              OR: [{ name: { contains: key, mode: "insensitive" } }],
            }
          : {}),
        deleted_at: null,
      },
    });

    const result = {
      ...data,
      items: data.items.map(flattenComic),
    };

    return result;
  };
}

export default new Comic();
