import express from "express";

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import comicRouter from "./comic.routes.js";
import comicGenreRouter from "./comicGenre.routes.js";
import bookmarkRouter from "./bookmark.routes.js";
import ratingRouter from "./rating.routes.js";
import genreRouter from "./genre.routes.js";

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/user", userRouter);
Router.use("/comic", comicRouter);
Router.use("/genre", comicGenreRouter);
Router.use("/bookmark", bookmarkRouter);
Router.use("/review", ratingRouter);
Router.use("/genre", genreRouter);

export default Router;
