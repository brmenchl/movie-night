/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Night" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "theme" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieSelection" (
    "movieId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "friendDisplayName" TEXT,
    "nightId" TEXT NOT NULL,

    PRIMARY KEY ("movieId", "friendId", "nightId"),
    CONSTRAINT "MovieSelection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "Night" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("id", "title") SELECT "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_name_key" ON "Friend"("name");
