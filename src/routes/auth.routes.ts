import { Router } from "express";
import { login, register } from "../controllers/index.js";
import catchAsync from "../utils/catchAsync.js";
import validateRequest from "../middlewares/validateRequest.js";
import { userCreate, userLogin } from "../types/user.schema.js";

const router = Router();

router.post("/register", validateRequest(userCreate), catchAsync(register));

router.post("/login", validateRequest(userLogin), catchAsync(login));

export default router;
