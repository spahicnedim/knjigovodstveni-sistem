-- DropForeignKey
ALTER TABLE "ArtikliCijene" DROP CONSTRAINT "ArtikliCijene_artikliId_fkey";

-- DropForeignKey
ALTER TABLE "SkladisteArtikli" DROP CONSTRAINT "SkladisteArtikli_artikliId_fkey";

-- DropForeignKey
ALTER TABLE "SkladisteArtikli" DROP CONSTRAINT "SkladisteArtikli_skladisteId_fkey";

-- AlterTable
ALTER TABLE "ArtikliCijene" ALTER COLUMN "artikliId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SkladisteArtikli" ALTER COLUMN "skladisteId" DROP NOT NULL,
ALTER COLUMN "artikliId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ArtikliCijene" ADD CONSTRAINT "ArtikliCijene_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_skladisteId_fkey" FOREIGN KEY ("skladisteId") REFERENCES "Skladiste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE SET NULL ON UPDATE CASCADE;
