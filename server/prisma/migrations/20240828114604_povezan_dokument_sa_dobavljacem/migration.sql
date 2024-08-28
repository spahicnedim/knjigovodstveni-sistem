-- AlterTable
ALTER TABLE "Dokumenti" ADD COLUMN     "kupacDobavljacId" INTEGER;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_kupacDobavljacId_fkey" FOREIGN KEY ("kupacDobavljacId") REFERENCES "KupacDobavljac"("id") ON DELETE SET NULL ON UPDATE CASCADE;
