import { Request, Response, NextFunction } from "express";
import ClientError from "../handler/ClientError.js";
import { GenreQueries, UserQueries } from "../queries/index.js";

async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = await GenreQueries.getAllGenre();

  return {
    statusCode: 200,
    data,
  };
}

async function addCategory(req: Request, res: Response, next: NextFunction) {
  const genre = req.body.genre;

  const data = await GenreQueries.addGenre(genre);

  return {
    statusCode: 201,
    data,
  };
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const genreId = req.params.genreId;

  const data = await GenreQueries.deleteGenre(genreId);

  return {
    statusCode: 200,
    data,
  };
}

async function searchCategory(req: Request, res: Response, next: NextFunction) {
  const genre = req.validatedQuery.name;

  const data = await GenreQueries.searchGenreByName(genre);

  return {
    statusCode: 200,
    data,
  };
}

export { getAllCategories, searchCategory, deleteCategory, addCategory };
