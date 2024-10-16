-- AlterTable
ALTER TABLE "SkladisteArtikli" ADD COLUMN     "cijenaId" INTEGER;

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_cijenaId_fkey" FOREIGN KEY ("cijenaId") REFERENCES "ArtikliCijene"("id") ON DELETE SET NULL ON UPDATE CASCADE;
