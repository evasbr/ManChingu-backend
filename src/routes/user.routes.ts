import { Router } from "express";
import { getProfileById, getMyProfile } from "../controllers/index.js";
import catchAsync from "../utils/catchAsync.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.get("/my", authMiddleware, catchAsync(getMyProfile));

router.get("/:userId", catchAsync(getProfileById));

export default router;
