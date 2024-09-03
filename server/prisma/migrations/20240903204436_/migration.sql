-- AlterTable
ALTER TABLE "Dokumenti" ADD COLUMN     "valutaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_valutaId_fkey" FOREIGN KEY ("valutaId") REFERENCES "Valuta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
