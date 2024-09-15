/*
  Warnings:

  - You are about to drop the column `valuta` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "valuta",
ADD COLUMN     "valutaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_valutaId_fkey" FOREIGN KEY ("valutaId") REFERENCES "Valuta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
