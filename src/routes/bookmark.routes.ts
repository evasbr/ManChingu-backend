import { Router } from "express";
import {
  addBookmark,
  updateBookmarkStatus,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
} from "../controllers/index.js";
import catchAsync from "../utils/catchAsync.js";
import {
  bookmarkQuerySchema,
  bookmarkStatusQuerySchema,
} from "../types/bookmark.schema.js";
import authMiddleware from "../middlewares/auth.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = Router();

router.get(
  "/all/:userId",
  authMiddleware,
  validateQuery(bookmarkQuerySchema),
  catchAsync(getAllBookmarkByUserId)
);

router.post(
  "/new/:comicId",
  authMiddleware,
  validateQuery(bookmarkStatusQuerySchema),
  catchAsync(addBookmark)
);

router.get("/comic/:comicId", authMiddleware, catchAsync(getBookmarkByComicId));

router.get("/:bookmarkId", catchAsync(getBookmarkById));

router.put(
  "/:bookmarkId",
  authMiddleware,
  validateQuery(bookmarkStatusQuerySchema),
  catchAsync(updateBookmarkStatus)
);

router.delete("/:bookmarkId", authMiddleware, catchAsync(deleteBookmark));

export default router;
