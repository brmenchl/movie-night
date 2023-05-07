-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Night" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "theme" TEXT NOT NULL
);
INSERT INTO "new_Night" ("date", "id", "theme") SELECT "date", "id", "theme" FROM "Night";
DROP TABLE "Night";
ALTER TABLE "new_Night" RENAME TO "Night";
CREATE UNIQUE INDEX "Night_date_key" ON "Night"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
