/*
  Warnings:

  - You are about to drop the `GradoviCompany` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sjedisteId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sjedisteId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GradoviCompany" DROP CONSTRAINT "GradoviCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "GradoviCompany" DROP CONSTRAINT "GradoviCompany_gradId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "sjedisteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "GradoviCompany";

-- CreateIndex
CREATE UNIQUE INDEX "Company_sjedisteId_key" ON "Company"("sjedisteId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_sjedisteId_fkey" FOREIGN KEY ("sjedisteId") REFERENCES "Gradovi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
