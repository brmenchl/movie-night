-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Night" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "winningSelectionMovieId" TEXT,
    "winningSelectionFriendId" TEXT,
    "winningSelectionNightId" TEXT,
    CONSTRAINT "Night_winningSelectionMovieId_winningSelectionFriendId_winningSelectionNightId_fkey" FOREIGN KEY ("winningSelectionMovieId", "winningSelectionFriendId", "winningSelectionNightId") REFERENCES "MovieSelection" ("movieId", "friendId", "nightId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Night" ("date", "id", "theme") SELECT "date", "id", "theme" FROM "Night";
DROP TABLE "Night";
ALTER TABLE "new_Night" RENAME TO "Night";
CREATE UNIQUE INDEX "Night_date_key" ON "Night"("date");
CREATE UNIQUE INDEX "Night_winningSelectionMovieId_winningSelectionFriendId_winningSelectionNightId_key" ON "Night"("winningSelectionMovieId", "winningSelectionFriendId", "winningSelectionNightId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
