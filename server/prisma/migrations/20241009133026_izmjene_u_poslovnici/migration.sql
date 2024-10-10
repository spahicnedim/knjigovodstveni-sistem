/*
  Warnings:

  - You are about to drop the column `userId` on the `Poslovnice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Poslovnice" DROP CONSTRAINT "Poslovnice_userId_fkey";

-- AlterTable
ALTER TABLE "Poslovnice" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "poslovniceId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_poslovniceId_fkey" FOREIGN KEY ("poslovniceId") REFERENCES "Poslovnice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
