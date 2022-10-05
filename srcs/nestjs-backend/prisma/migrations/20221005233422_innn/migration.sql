/*
  Warnings:

  - You are about to drop the `ongoingGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ongoingGames";

-- CreateTable
CREATE TABLE "ongoingGame" (
    "id" SERIAL NOT NULL,
    "JOUEUR_1_SOCKET" TEXT,
    "JOUEUR_1_PSEUDO" TEXT,
    "JOUEUR_2_SOCKET" TEXT,
    "JOUEUR_2_PSEUDO" TEXT,

    CONSTRAINT "ongoingGame_pkey" PRIMARY KEY ("id")
);
