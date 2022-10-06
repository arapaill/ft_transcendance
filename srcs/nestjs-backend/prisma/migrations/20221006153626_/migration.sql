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

-- CreateTable
CREATE TABLE "chatMessage" (
    "id" SERIAL NOT NULL,
    "userPseudo" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelName" TEXT NOT NULL,
    "chatChannelId" INTEGER,

    CONSTRAINT "chatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatChannel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "admins" INTEGER[],
    "users" INTEGER[],
    "type" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "chatChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_Full_Name_key" ON "users"("Full_Name");

-- AddForeignKey
ALTER TABLE "chatMessage" ADD CONSTRAINT "chatMessage_chatChannelId_fkey" FOREIGN KEY ("chatChannelId") REFERENCES "chatChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
