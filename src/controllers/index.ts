import { register, login } from "./auth.controllers";

import {
  addNewComic,
  updateComicById,
  deleteComicById,
  getAllComic,
  getComicById,
} from "./comic.controllers";

import { configureComicGenre } from "./comicGenre.controllers";

export {
  register,
  login,
  addNewComic,
  updateComicById,
  deleteComicById,
  getAllComic,
  getComicById,
  configureComicGenre,
};
