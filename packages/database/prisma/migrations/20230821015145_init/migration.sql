-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Night" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "winningSelectionFriendId" TEXT,
    "winningSelectionNightId" TEXT,

    CONSTRAINT "Night_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieSelection" (
    "movieId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "nightId" TEXT NOT NULL,

    CONSTRAINT "MovieSelection_pkey" PRIMARY KEY ("friendId","nightId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_name_key" ON "Friend"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Night_date_key" ON "Night"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Night_winningSelectionFriendId_winningSelectionNightId_key" ON "Night"("winningSelectionFriendId", "winningSelectionNightId");

-- AddForeignKey
ALTER TABLE "Night" ADD CONSTRAINT "Night_winningSelectionFriendId_winningSelectionNightId_fkey" FOREIGN KEY ("winningSelectionFriendId", "winningSelectionNightId") REFERENCES "MovieSelection"("friendId", "nightId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSelection" ADD CONSTRAINT "MovieSelection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSelection" ADD CONSTRAINT "MovieSelection_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSelection" ADD CONSTRAINT "MovieSelection_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "Night"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
