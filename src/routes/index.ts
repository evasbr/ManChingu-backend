import authRouter from "./auth.routes.js";
import express from "express";

const Router = express.Router();

Router.use("/auth", authRouter);

export default Router;