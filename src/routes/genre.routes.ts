import {
  getAllCategories,
  searchCategory,
  deleteCategory,
  addCategory,
} from "../controllers/index.js";

import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import validateRequest from "../middlewares/validateRequest.js";
import validateQuery from "../middlewares/validateQuery.js";
import { genreSchema } from "../types/genre.schema.js";

const router = Router();

router.get("/search", validateQuery(genreSchema), catchAsync(searchCategory));

router.get("/all", catchAsync(getAllCategories));

router.post("/new", validateRequest(genreSchema), catchAsync(addCategory));

router.delete("/:genreId", catchAsync(deleteCategory));

export default router;
