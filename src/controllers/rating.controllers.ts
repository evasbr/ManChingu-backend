import { Request, Response, NextFunction } from "express";
import { RatingQueries } from "../queries/index.js";
import ClientError from "../handler/ClientError.js";

const addRating = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id_user;
  const comicId = req.params.comicId;
  const { rating, review_text } = req.validatedData;

  const oldReview = await RatingQueries.getUserRatingOnComic(userId, comicId);

  if (oldReview) {
    throw new ClientError("You already have a review on this manhwa", 400);
  }

  const review = await RatingQueries.addNewRating(
    userId,
    comicId,
    rating,
    review_text
  );

  if (!review) {
    throw new ClientError("Something wrong when creating review", 400);
  }

  return {
    statusCode: 201,
    message: "Review is created",
    data: review,
  };
};

const updateRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!.id_user;
  const reviewId = req.params.reviewId;
  const { rating, review_text } = req.validatedData;

  const oldReview = await RatingQueries.getRatingById(reviewId);

  if (!oldReview) {
    throw new ClientError("Review not found", 404);
  }

  if (oldReview.id_user !== userId) {
    throw new ClientError("You are not authorized for this review", 403);
  }

  const review = await RatingQueries.updateRating(
    reviewId,
    rating,
    review_text
  );

  if (!review) {
    throw new ClientError("Something wrong when updating review", 400);
  }

  return {
    statusCode: 200,
    message: "Review is updated",
    data: review,
  };
};

const deleteRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!.id_user;
  const reviewId = req.params.reviewId;

  const oldReview = await RatingQueries.getRatingById(reviewId);

  if (!oldReview) {
    throw new ClientError("Review not found", 404);
  }

  if (oldReview.id_user !== userId) {
    throw new ClientError("You are not authorized for this review", 403);
  }

  const result = await RatingQueries.deleteRating(reviewId);

  if (!result) {
    throw new ClientError("Something wrong when deleting review", 400);
  }

  return {
    statusCode: 200,
    message: "Review is deleted",
  };
};

const getRatingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.reviewId;
  const review = await RatingQueries.getRatingById(reviewId);

  if (!review) {
    throw new ClientError("Review not found", 404);
  }

  return {
    statusCode: 200,
    data: review,
  };
};

const getAllRatingByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!.id_user;
  const key = req.validatedQuery.key;
  const ratings = await RatingQueries.getUserRating(userId, key);

  return {
    statusCode: 200,
    data: ratings,
  };
};

const getAllRatingForComic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comicId = req.params.comicId;
  const key = req.validatedQuery.key;
  const ratings = await RatingQueries.getComicRating(comicId, key);

  return {
    statusCode: 200,
    data: ratings,
  };
};

export {
  addRating,
  updateRating,
  deleteRating,
  getAllRatingByUserId,
  getAllRatingForComic,
  getRatingById,
};
