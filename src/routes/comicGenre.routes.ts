import { Router } from "express";
import { configureComicGenre } from "../controllers/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = Router();

router.post("/:comicId", catchAsync(configureComicGenre));

export default router;
