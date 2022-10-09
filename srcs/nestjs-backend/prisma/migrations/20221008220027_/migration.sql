-- AlterTable
ALTER TABLE "chatChannel" ADD COLUMN     "usersBanned" INTEGER[],
ADD COLUMN     "usersKicked" INTEGER[],
ADD COLUMN     "usersMuted" INTEGER[];
