-- CreateTable
CREATE TABLE "ArtikliCijene" (
    "id" SERIAL NOT NULL,
    "artikliId" INTEGER NOT NULL,
    "cijena" DECIMAL(10,2) NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtikliCijene_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArtikliCijene_artikliId_datum_idx" ON "ArtikliCijene"("artikliId", "datum");

-- AddForeignKey
ALTER TABLE "ArtikliCijene" ADD CONSTRAINT "ArtikliCijene_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
