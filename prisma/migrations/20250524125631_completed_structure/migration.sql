/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo_profile` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BookmarkStatus" AS ENUM ('COMPLETED', 'READING', 'DROPPED', 'PLAN_TO_READ');

-- CreateEnum
CREATE TYPE "ComicStatus" AS ENUM ('COMPLETED', 'ON_GOING');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "photo_profile";

-- CreateTable
CREATE TABLE "Genre" (
    "id_genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id_genre")
);

-- CreateTable
CREATE TABLE "Comic" (
    "id_comic" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "synopsis" TEXT,
    "author" TEXT,
    "artist" TEXT,
    "status" "ComicStatus" NOT NULL DEFAULT 'ON_GOING',
    "poster" TEXT NOT NULL,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id_comic")
);

-- CreateTable
CREATE TABLE "ComicGenre" (
    "id_comic_genre" TEXT NOT NULL,
    "id_comic" TEXT NOT NULL,
    "id_genre" TEXT NOT NULL,

    CONSTRAINT "ComicGenre_pkey" PRIMARY KEY ("id_comic_genre")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id_bookmark" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_comic" TEXT NOT NULL,
    "status" "BookmarkStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id_bookmark")
);

-- CreateTable
CREATE TABLE "Review" (
    "id_review" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_comic" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id_review")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comic_name_key" ON "Comic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_id_user_id_comic_key" ON "Bookmark"("id_user", "id_comic");

-- AddForeignKey
ALTER TABLE "ComicGenre" ADD CONSTRAINT "ComicGenre_id_comic_fkey" FOREIGN KEY ("id_comic") REFERENCES "Comic"("id_comic") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicGenre" ADD CONSTRAINT "ComicGenre_id_genre_fkey" FOREIGN KEY ("id_genre") REFERENCES "Genre"("id_genre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_id_comic_fkey" FOREIGN KEY ("id_comic") REFERENCES "Comic"("id_comic") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_id_comic_fkey" FOREIGN KEY ("id_comic") REFERENCES "Comic"("id_comic") ON DELETE RESTRICT ON UPDATE CASCADE;
