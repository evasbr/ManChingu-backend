import { Request, Response, NextFunction } from "express";
import ClientError from "../handler/ClientError.js";
import { BookmarkStatus } from "@prisma/client";
import { ComicQueries, BookmarkQueries } from "../queries/index.js";

const addBookmark = async (req: Request, res: Response, next: NextFunction) => {
  const comicId = req.params.comicId;
  const userId = req.user.id_user;
  let status = req.validatedQuery.status;

  const comicData = await ComicQueries.getComicById(comicId);
  if (!comicData) {
    throw new ClientError("Comic not found", 404);
  }

  const bookmarkData = await BookmarkQueries.checkIfUserHasBookmarkByComicId(
    comicId,
    userId
  );

  if (bookmarkData !== null) {
    throw new ClientError("You already has bookmarked this comic", 400);
  }

  const data = await BookmarkQueries.addBookmark(comicId, userId, status);

  if (!data) {
    throw new ClientError("Failed to bookmark a manhwa", 400);
  }

  return {
    statusCode: 201,
    message: "Comic created",
    data,
  };
};

const updateBookmarkStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookmarkId = req.params.bookmarkId;
  const status = req.validatedQuery.status;
  const userId = req.user.id_user;

  const bookmarkData = await BookmarkQueries.getBookmarkById(bookmarkId);

  if (!bookmarkData) {
    throw new ClientError("Bookmark not found", 404);
  }

  if (bookmarkData.id_user !== userId) {
    throw new ClientError("You are not authorized for this bookmark", 403);
  }

  const data = await BookmarkQueries.updateBookmarkStatus(bookmarkId, status);

  return {
    statusCode: 200,
    message: "Bookmark'status updated",
    data,
  };
};

const deleteBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookmarkId = req.params.bookmarkId;

  const userId = req.user.id_user;

  const bookmarkData = await BookmarkQueries.getBookmarkById(bookmarkId);

  if (!bookmarkData) {
    throw new ClientError("Bookmark not found", 404);
  }

  if (bookmarkData.id_user !== userId) {
    throw new ClientError("You are not authorized for this bookmark", 403);
  }

  const data = await BookmarkQueries.deleteBookmark(bookmarkId);

  if (!data) {
    throw new ClientError("Bookmark failed to be deleted");
  }

  return {
    statusCode: 200,
    message: "Bookmark deleted",
  };
};

const getBookmarkById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookmarkId = req.params.bookmarkId;

  const data = await BookmarkQueries.getBookmarkById(bookmarkId);

  return {
    statusCode: 200,
    data,
  };
};

const getBookmarkByComicId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comicId = req.params.comicId;
  const userId = req.user.id_user;

  const data = await BookmarkQueries.getBookmarkByComicId(comicId, userId);

  return {
    statusCode: 200,
    data,
  };
};

// Can add filter by status and key(manwha title)
const getAllBookmarkByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const {
    status,
    key,
  }: { status: BookmarkStatus | undefined; key: string | undefined } =
    req.validatedQuery;

  const data = await BookmarkQueries.getAllBookmarkByUserId(
    userId,
    status,
    key
  );

  return {
    statusCode: 200,
    data,
  };
};

// Can add filter by status and key(manwha title)
const getAllMyBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id_user;
  const {
    status,
    key,
  }: { status: BookmarkStatus | undefined; key: string | undefined } =
    req.validatedQuery;

  const data = await BookmarkQueries.getAllBookmarkByUserId(
    userId,
    status,
    key
  );

  return {
    statusCode: 200,
    data,
  };
};

export {
  addBookmark,
  updateBookmarkStatus,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
  getAllMyBookmark,
};
