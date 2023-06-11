/*
  Warnings:

  - The primary key for the `MovieSelection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `winningSelectionMovieId` on the `Night` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieSelection" (
    "movieId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "nightId" TEXT NOT NULL,

    PRIMARY KEY ("friendId", "nightId"),
    CONSTRAINT "MovieSelection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSelection_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "Night" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieSelection" ("friendId", "movieId", "nightId") SELECT "friendId", "movieId", "nightId" FROM "MovieSelection";
DROP TABLE "MovieSelection";
ALTER TABLE "new_MovieSelection" RENAME TO "MovieSelection";
CREATE TABLE "new_Night" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "winningSelectionFriendId" TEXT,
    "winningSelectionNightId" TEXT,
    CONSTRAINT "Night_winningSelectionFriendId_winningSelectionNightId_fkey" FOREIGN KEY ("winningSelectionFriendId", "winningSelectionNightId") REFERENCES "MovieSelection" ("friendId", "nightId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Night" ("date", "id", "theme", "winningSelectionFriendId", "winningSelectionNightId") SELECT "date", "id", "theme", "winningSelectionFriendId", "winningSelectionNightId" FROM "Night";
DROP TABLE "Night";
ALTER TABLE "new_Night" RENAME TO "Night";
CREATE UNIQUE INDEX "Night_date_key" ON "Night"("date");
CREATE UNIQUE INDEX "Night_winningSelectionFriendId_winningSelectionNightId_key" ON "Night"("winningSelectionFriendId", "winningSelectionNightId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
