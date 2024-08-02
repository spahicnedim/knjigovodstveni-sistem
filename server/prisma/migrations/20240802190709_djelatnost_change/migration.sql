/*
  Warnings:

  - You are about to drop the column `companyId` on the `Djelatnost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Djelatnost" DROP CONSTRAINT "Djelatnost_companyId_fkey";

-- DropIndex
DROP INDEX "Djelatnost_companyId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "djelatnostId" INTEGER;

-- AlterTable
ALTER TABLE "Djelatnost" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_djelatnostId_fkey" FOREIGN KEY ("djelatnostId") REFERENCES "Djelatnost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
