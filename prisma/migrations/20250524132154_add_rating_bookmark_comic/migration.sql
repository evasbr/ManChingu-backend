-- AlterTable
ALTER TABLE "Comic" ADD COLUMN     "bookmarked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
