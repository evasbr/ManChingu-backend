import {
  addRating,
  updateRating,
  deleteRating,
  getAllRatingByUserId,
  getAllRatingForComic,
  getRatingById,
} from "../controllers/index.js";

import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import validateRequest from "../middlewares/validateRequest.js";
import { ratingKeySchema, ratingSchema } from "../types/rating.schema.js";
import authMiddleware from "../middlewares/auth.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = Router();

router.post(
  "/new/:comicId",
  authMiddleware,
  validateRequest(ratingSchema),
  catchAsync(addRating)
);

router.get(
  "/user",
  authMiddleware,
  validateQuery(ratingKeySchema),
  catchAsync(getAllRatingByUserId)
);

router.get(
  "/comic/:comicId",
  authMiddleware,
  validateQuery(ratingKeySchema),
  catchAsync(getAllRatingForComic)
);

router.put(
  "/:reviewId",
  authMiddleware,
  validateRequest(ratingSchema),
  catchAsync(updateRating)
);

router.delete("/:reviewId", authMiddleware, catchAsync(deleteRating));

router.get("/:reviewId", catchAsync(getRatingById));

export default router;
