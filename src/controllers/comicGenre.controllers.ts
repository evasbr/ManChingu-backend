import { Request, Response, NextFunction } from "express";
import ClientError from "../handler/ClientError";
import { ComicGenreQueries, ComicQueries } from "../queries";

async function configureComicGenre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const comicId = req.params.comicId;
  const { genres } = req.body;

  // Check if the product exist
  const comic = await ComicQueries.getComicById(comicId);

  if (!comic) {
    throw new ClientError("Comic not found", 404);
  }

  const oldComicGenre = await ComicGenreQueries.getAllComicGenre(comicId);
  const existingGenreIds = oldComicGenre.map((c) => c.id_genre);

  const requestedSet = new Set(genres);
  const existingSet = new Set(existingGenreIds);

  let genreToCreate = [];
  let genreToDelete = [];

  for (let c of genres) {
    if (!existingSet.has(c)) {
      genreToCreate.push(c);
    }
  }

  for (let c of existingSet) {
    if (!requestedSet.has(c)) {
      genreToDelete.push(c);
    }
  }

  let newData = await ComicGenreQueries.configureComicGenre(
    comicId,
    genreToCreate,
    genreToDelete
  );

  if (!newData) {
    throw new ClientError("Something's wrong when add/delete comic's genres");
  }

  return {
    success: true,
    message: "Successfully create new comic's genres",
    data: newData,
    statusCode: 201,
  };
}

export { configureComicGenre };
