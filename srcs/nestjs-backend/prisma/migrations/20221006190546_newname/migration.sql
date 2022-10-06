-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "Full_Name" TEXT,
    "two_factor" BOOLEAN,
    "avatar" TEXT,
    "line_status" TEXT,
    "wins" INTEGER,
    "losses" INTEGER,
    "ladder_level" INTEGER,
    "achievements" TEXT,
    "secret" TEXT,
    "email" TEXT,
    "qrCode" TEXT,
    "friends" TEXT[],
    "demFriends" TEXT[],
    "Description" TEXT,
    "MatchsHistory" TEXT[],
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "match" BOOLEAN,
    "toUse" TEXT,
    "toUses" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ongoingGame" (
    "id" SERIAL NOT NULL,
    "JOUEUR_1_SOCKET" TEXT,
    "JOUEUR_1_PSEUDO" TEXT,
    "JOUEUR_2_SOCKET" TEXT,
    "JOUEUR_2_PSEUDO" TEXT,

    CONSTRAINT "ongoingGame_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_Full_Name_key" ON "users"("Full_Name");
