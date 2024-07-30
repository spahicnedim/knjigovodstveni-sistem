/*
  Warnings:

  - You are about to drop the column `ID_broj` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `PDV_broj` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `obveznik_pdv` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PDVbroj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IDbroj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `IDbroj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PDVbroj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obveznikPDV` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_ID_broj_key";

-- DropIndex
DROP INDEX "Company_PDV_broj_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ID_broj",
DROP COLUMN "PDV_broj",
DROP COLUMN "obveznik_pdv",
ADD COLUMN     "IDbroj" INTEGER NOT NULL,
ADD COLUMN     "PDVbroj" INTEGER NOT NULL,
ADD COLUMN     "obveznikPDV" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_PDVbroj_key" ON "Company"("PDVbroj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_IDbroj_key" ON "Company"("IDbroj");
