-- AlterTable
ALTER TABLE "Artikli" ADD COLUMN     "poslovniceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Artikli" ADD CONSTRAINT "Artikli_poslovniceId_fkey" FOREIGN KEY ("poslovniceId") REFERENCES "Poslovnice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
