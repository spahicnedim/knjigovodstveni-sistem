/*
  Warnings:

  - You are about to drop the column `dokumentId` on the `PDV` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PDV" DROP CONSTRAINT "PDV_dokumentId_fkey";

-- AlterTable
ALTER TABLE "Dokumenti" ADD COLUMN     "pDVId" INTEGER;

-- AlterTable
ALTER TABLE "PDV" DROP COLUMN "dokumentId";

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_pDVId_fkey" FOREIGN KEY ("pDVId") REFERENCES "PDV"("id") ON DELETE SET NULL ON UPDATE CASCADE;
