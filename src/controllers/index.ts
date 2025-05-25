import { register, login } from "./auth.controllers.js";

import {
  addNewComic,
  updateComicById,
  deleteComicById,
  getAllComic,
  getComicById,
} from "./comic.controllers.js";

import { getMyProfile, getProfileById } from "./user.controllers.js";

import { configureComicGenre } from "./comicGenre.controllers.js";

import {
  addBookmark,
  updateBookmarkStatus,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
  getAllMyBookmark,
} from "./bookmark.controllers.js";

import {
  addRating,
  updateRating,
  deleteRating,
  getAllRatingByUserId,
  getAllRatingForComic,
  getRatingById,
} from "./rating.controllers.js";

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
  getAllMyBookmark,
  deleteBookmark,
  getBookmarkById,
  getAllBookmarkByUserId,
  getBookmarkByComicId,
  addRating,
  updateRating,
  deleteRating,
  getAllRatingByUserId,
  getAllRatingForComic,
  getRatingById,
  getMyProfile,
  getProfileById,
};
