import { PrismaClient } from "@prisma/client";
import { ComicQueries } from "./index.js";
import ClientError from "../handler/ClientError";
const prisma = new PrismaClient();

class Rating {
  addNewRating = async (
    userId: string,
    comicId: string,
    rating: number,
    review_text?: string
  ) => {
    return await prisma.$transaction(async (tx) => {
      const oldComic = await tx.comic.findUnique({
        where: { id_comic: comicId },
      });

      if (!oldComic) {
        throw new ClientError("Comic not found", 404);
      }

      const newRatingCount = oldComic.rating_count + 1;
      const newRating =
        (oldComic.rating * oldComic.rating_count + rating) / newRatingCount;

      const newReview = await tx.review.create({
        data: {
          id_user: userId,
          id_comic: comicId,
          rating,
          review_text,
        },
        include: {
          comic: {
            select: {
              name: true,
            },
          },
        },
      });

      await tx.comic.update({
        where: { id_comic: comicId },
        data: {
          rating: Math.round(newRating * 10) / 10,
          rating_count: newRatingCount,
        },
      });

      return newReview;
    });
  };

  updateRating = async (
    reviewId: string,
    rating: number,
    review_text?: string
  ) => {
    const oldReview = await prisma.review.findUnique({
      where: { id_review: reviewId },
    });

    if (!oldReview) throw new ClientError("Review not found", 404);

    return await prisma.$transaction(async (tx) => {
      const oldComic = await tx.comic.findUnique({
        where: { id_comic: oldReview.id_comic },
      });

      if (!oldComic) {
        throw new ClientError("Comic not found", 404);
      }

      const newRating =
        (oldComic.rating * oldComic.rating_count - oldReview.rating + rating) /
        oldComic.rating_count;

      const updatedReview = await tx.review.update({
        where: { id_review: reviewId },
        data: {
          rating,
          review_text,
        },
        include: {
          comic: {
            select: { name: true },
          },
        },
      });

      await tx.comic.update({
        where: { id_comic: oldReview.id_comic },
        data: {
          rating: Math.round((newRating ?? 0) * 10) / 10,
        },
      });

      return updatedReview;
    });
  };

  deleteRating = async (reviewId: string) => {
    const review = await prisma.review.findUnique({
      where: { id_review: reviewId },
    });

    if (!review) throw new Error("Review not found");

    return await prisma.$transaction(async (tx) => {
      // Get the current comic rating and count
      const comic = await tx.comic.findUnique({
        where: { id_comic: review.id_comic },
      });

      if (!comic) throw new Error("Comic not found");

      // New rating count after deletion
      const newRatingCount = comic.rating_count - 1;

      // Calculate new rating safely
      // If no more ratings, set rating to 0
      const newRating =
        newRatingCount > 0
          ? (comic.rating * comic.rating_count - review.rating) / newRatingCount
          : 0;

      // Delete the review
      await tx.review.delete({
        where: { id_review: reviewId },
      });

      // Update comic with new rating and rating_count
      await tx.comic.update({
        where: { id_comic: review.id_comic },
        data: {
          rating: Math.round(newRating * 10) / 10,
          rating_count: newRatingCount,
        },
      });

      return { message: "Review deleted successfully" };
    });
  };

  getComicRating = async (comicId: string, key?: string) => {
    return await prisma.review.findMany({
      where: {
        id_comic: comicId,
        review_text: key ? { contains: key, mode: "insensitive" } : undefined,
      },
      include: {
        comic: {
          select: { name: true },
        },
      },
    });
  };

  getUserRating = async (userId: string, key?: string) => {
    return await prisma.review.findMany({
      where: {
        id_user: userId,
        ...(key
          ? {
              OR: [
                { review_text: { contains: key, mode: "insensitive" } },
                { comic: { name: { contains: key, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: {
        comic: {
          select: { name: true },
        },
      },
    });
  };

  getUserRatingOnComic = async (userId: string, comicId: string) => {
    return await prisma.review.findFirst({
      where: {
        id_user: userId,
        id_comic: comicId,
      },
      include: {
        comic: {
          select: { name: true },
        },
      },
    });
  };

  getRatingById = async (reviewId: string) => {
    return await prisma.review.findUnique({
      where: { id_review: reviewId },
      include: {
        comic: {
          select: { name: true },
        },
      },
    });
  };
}

export default new Rating();
