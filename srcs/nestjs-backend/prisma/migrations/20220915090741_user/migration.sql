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
    "friends" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_Full_Name_key" ON "users"("Full_Name");
