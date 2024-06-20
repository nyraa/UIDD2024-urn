/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Morgue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "golden_quote" TEXT NOT NULL,
    "cover_src" TEXT NOT NULL,
    "urn_index" INTEGER NOT NULL,
    "urn_texture_src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "born_date" TEXT NOT NULL,
    "death_date" TEXT NOT NULL,
    "last_live_city" TEXT NOT NULL,
    "life_story" TEXT NOT NULL,
    CONSTRAINT "Morgue_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "morgueId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Gallery_morgueId_fkey" FOREIGN KEY ("morgueId") REFERENCES "Morgue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Urn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "person" TEXT NOT NULL,
    "urn" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

