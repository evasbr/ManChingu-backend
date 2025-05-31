import ClientError from "../handler/ClientError.js";
import { BookmarkStatus } from "../types/bookmark.schema.js";
import { comicSelected, flattenComic } from "./comic.queries.js";
import { ComicQueries } from "./index.js";
import prisma from "./prisma.js";

const selectedBookmark = {
  id_bookmark: true,
  id_user: true,
  comic: {
    select: {
      ...comicSelected,
    },
  },
  status: true,
  created_at: true,
  updated_at: true,
};

class Bookmark {
  addBookmark = async (
    comicId: string,
    userId: string,
    status: BookmarkStatus = "READING"
  ) => {
    const result = await prisma.$transaction(async (tx) => {
      const data = await tx.bookmark.create({
        data: {
          id_comic: comicId,
          id_user: userId,
          status,
        },
        select: selectedBookmark,
      });

      await tx.comic.update({
        where: {
          id_comic: comicId,
        },
        data: {
          bookmarked: {
            increment: 1,
          },
        },
      });

      return {
        ...data,
        comic: flattenComic(data.comic),
      };
    });

    return result;
  };

  getBookmarkById = async (bookmarkId: string) => {
    const data = await prisma.bookmark.findUnique({
      where: {
        id_bookmark: bookmarkId,
        deleted_at: null,
      },
      select: selectedBookmark,
    });

    if (!data) {
      throw new ClientError("Bookmark not found", 404);
    }

    const result = {
      ...data,
      comic: flattenComic(data.comic),
    };

    return result;
  };

  checkIfUserHasBookmarkByComicId = async (comicId: string, userId: string) => {
    const data = await prisma.bookmark.findFirst({
      where: {
        id_comic: comicId,
        id_user: userId,
        deleted_at: null,
      },
      select: selectedBookmark,
    });

    if (data !== null) {
      throw new ClientError("You already has bookmark for this comic", 404);
    }

    return null;
  };

  getBookmarkByComicId = async (comicId: string, userId: string) => {
    const data = await prisma.bookmark.findFirst({
      where: {
        id_comic: comicId,
        id_user: userId,
        deleted_at: null,
      },
      select: selectedBookmark,
    });

    if (!data) {
      throw new ClientError("Bookmark not found", 404);
    }

    const result = {
      ...data,
      comic: flattenComic(data.comic),
    };

    return result;
  };

  updateBookmarkStatus = async (bookmarkId: string, status: BookmarkStatus) => {
    const data = await prisma.bookmark.update({
      where: {
        id_bookmark: bookmarkId,
        deleted_at: null,
      },
      data: {
        status,
      },
      select: selectedBookmark,
    });

    const result = {
      ...data,
      comic: flattenComic(data.comic),
    };

    return result;
  };

  deleteBookmark = async (bookmarkId: string) => {
    return await prisma.$transaction(async (tx) => {
      const data = await tx.bookmark.delete({
        where: {
          id_bookmark: bookmarkId,
          deleted_at: null,
        },
      });

      await tx.comic.update({
        where: { id_comic: data.id_comic },
        data: {
          bookmarked: {
            decrement: 1,
          },
        },
      });

      return data;
    });
  };

  getAllBookmarkByUserId = async (
    userId: string,
    status?: BookmarkStatus,
    key?: string
  ) => {
    const where: {
      id_user: string;
      deleted_at: null;
      status?: BookmarkStatus;
      name?: string;
    } = {
      id_user: userId,
      deleted_at: null,
    };

    if (status !== null && status !== undefined) {
      where.status = status;
    }

    if (key !== null && key !== undefined) {
      where.name = key;
    }

    const data = await prisma.bookmark.findMany({
      where,
      select: selectedBookmark,
    });

    const result = data.map((bookmark) => ({
      ...bookmark,
      comic: flattenComic(bookmark.comic), // flatten each comic individually
    }));

    return result;
  };
}

export default new Bookmark();
