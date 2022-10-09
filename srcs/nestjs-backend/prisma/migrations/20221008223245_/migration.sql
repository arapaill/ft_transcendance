/*
  Warnings:

  - Added the required column `userID` to the `chatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatMessage" ADD COLUMN     "userID" INTEGER NOT NULL;
