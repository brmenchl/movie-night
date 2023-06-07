/*
  Warnings:

  - You are about to drop the column `friendDisplayName` on the `MovieSelection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieSelection" (
    "movieId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "nightId" TEXT NOT NULL,

    PRIMARY KEY ("movieId", "friendId", "nightId"),
    CONSTRAINT "MovieSelection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "Night" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieSelection" ("friendId", "movieId", "nightId") SELECT "friendId", "movieId", "nightId" FROM "MovieSelection";
DROP TABLE "MovieSelection";
ALTER TABLE "new_MovieSelection" RENAME TO "MovieSelection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
