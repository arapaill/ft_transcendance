-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "MatchsHistory" TEXT[],
ADD COLUMN     "match" BOOLEAN,
ADD COLUMN     "toUse" TEXT,
ADD COLUMN     "toUses" TEXT[];

-- CreateTable
CREATE TABLE "ongoingGames" (
    "id" SERIAL NOT NULL,
    "JOUEUR_1_SOCKET" TEXT,
    "JOUEUR_1_PSEUDO" TEXT,
    "JOUEUR_2_SOCKET" TEXT,
    "JOUEUR_2_PSEUDO" TEXT,

    CONSTRAINT "ongoingGames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameHistory" (
    "id" SERIAL NOT NULL,
    "JOUEUR_1" TEXT,
    "JOUEUR_2" TEXT,
    "VAINQUEUR" TEXT,
    "SCORE_JOUEUR_1" TEXT,
    "SCORE_JOUEUR_2" TEXT,

    CONSTRAINT "gameHistory_pkey" PRIMARY KEY ("id")
);
