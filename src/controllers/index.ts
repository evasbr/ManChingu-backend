import { register, login } from "./auth.controllers.js";

import {
  addNewComic,
  updateComicById,
  deleteComicById,
  getAllComic,
  getComicById,
} from "./comic.controllers";

import { configureComicGenre } from "./comicGenre.controllers.js";

import {
  addBookmark,
  updateBookmarkStatus,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
} from "./bookmark.controllers.js";

export {
  register,
  login,
  addNewComic,
  updateComicById,
  deleteComicById,
  getAllComic,
  getComicById,
  configureComicGenre,
  addBookmark,
  updateBookmarkStatus,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
};
