import { Request, Response, NextFunction } from "express";
import { ComicQueries } from "../queries/index.js";
import ClientError from "../handler/ClientError.js";

const addNewComic = async (req: Request, res: Response, next: NextFunction) => {
  const { name, synopsis, author, artist, status, poster } = req.validatedData;

  const newComic = await ComicQueries.addNewComic({
    name,
    synopsis,
    author,
    artist,
    status,
    poster,
  });

  return {
    message: "Comic created",
    data: newComic,
    statusCode: 201,
  };
};

const getAllComic = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit, key } = req.query;

  const parsedPage = typeof page === "string" ? page : undefined;
  const parsedLimit = typeof limit === "string" ? limit : undefined;
  const parsedKey = typeof key === "string" ? key : null;

  const comics = await ComicQueries.getAllComic(
    parsedPage,
    parsedLimit,
    parsedKey
  );

  return { data: comics, statusCode: 200 };
};

const getComicById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comicId } = req.params;

  const comic = await ComicQueries.getComicById(comicId);

  if (!comic) {
    throw new ClientError("Comic not found", 404);
  }

  return {
    data: comic,
    statusCode: 200,
  };
};

const updateComicById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comicId } = req.params;
  const { name, synopsis, author, artist, status, poster } = req.validatedData;

  const updatedComic = await ComicQueries.editComic(
    { name, synopsis, author, artist, status, poster },
    comicId
  );

  if (!updateComicById) {
    throw new ClientError("Failed to update comic", 400);
  }

  return {
    message: "Successfuly update comic info",
    data: updatedComic,
    statusCode: 200,
  };
};

const deleteComicById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comicId } = req.params;

  const deletedComic = await ComicQueries.deleteComic(comicId);

  if (!deletedComic) {
    throw new ClientError("Failed to delete comic", 400);
  }

  return {
    message: "Comic deleted",
    statusCode: 200,
  };
};

export {
  addNewComic,
  getAllComic,
  getComicById,
  updateComicById,
  deleteComicById,
};
