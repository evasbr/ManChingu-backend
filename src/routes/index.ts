import express from "express";

import authRouter from "./auth.routes.js";
import comicRouter from "./comic.routes.js";

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/comic", comicRouter);

export default Router;
