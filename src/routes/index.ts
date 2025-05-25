import express from "express";

import authRouter from "./auth.routes.js";
import comicRouter from "./comic.routes.js";
import comicGenreRouter from "./comicGenre.routes.js";
import bookmarkRouter from "./bookmark.routes.js";

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/comic", comicRouter);
Router.use("/genre", comicGenreRouter);
Router.use("/bookmark", bookmarkRouter);

export default Router;
