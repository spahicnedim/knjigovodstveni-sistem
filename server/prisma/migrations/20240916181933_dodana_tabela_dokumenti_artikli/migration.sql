-- CreateTable
CREATE TABLE "DokumentiArtikli" (
    "id" SERIAL NOT NULL,
    "dokumentId" INTEGER NOT NULL,
    "artikliId" INTEGER NOT NULL,
    "kolicina" DECIMAL(10,2) NOT NULL,
    "cijena" DECIMAL(10,2) NOT NULL,
    "mpcijena" DECIMAL(10,2),

    CONSTRAINT "DokumentiArtikli_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DokumentiArtikli" ADD CONSTRAINT "DokumentiArtikli_dokumentId_fkey" FOREIGN KEY ("dokumentId") REFERENCES "Dokumenti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DokumentiArtikli" ADD CONSTRAINT "DokumentiArtikli_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
