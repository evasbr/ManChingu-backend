import {
  addNewComic,
  getAllComic,
  getComicById,
  updateComicById,
  deleteComicById,
} from "../controllers/index.js";

import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import validateRequest from "../middlewares/validateRequest.js";
import { comicCreate, comicUpdate } from "../types/comic.schema.js";

const router = Router();

router.get("/all", catchAsync(getAllComic));

router.post("/new", validateRequest(comicCreate), catchAsync(addNewComic));

router.put(
  "/:comicId",
  validateRequest(comicUpdate),
  catchAsync(updateComicById)
);

router.delete("/:comicId", catchAsync(deleteComicById));
router.get("/:comicId", catchAsync(getComicById));

export default router;
