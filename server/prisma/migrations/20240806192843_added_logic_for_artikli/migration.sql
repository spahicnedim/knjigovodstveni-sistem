-- CreateTable
CREATE TABLE "Artikli" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "sifra" TEXT NOT NULL,
    "jedinicaMjere" TEXT NOT NULL,

    CONSTRAINT "Artikli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkladisteArtikli" (
    "id" SERIAL NOT NULL,
    "skladisteId" INTEGER NOT NULL,
    "artikliId" INTEGER NOT NULL,
    "kolicina" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "SkladisteArtikli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferi" (
    "id" SERIAL NOT NULL,
    "artikliId" INTEGER NOT NULL,
    "izSkladisteId" INTEGER NOT NULL,
    "uSkladisteId" INTEGER NOT NULL,
    "kolicina" DECIMAL(10,2) NOT NULL,
    "datumTransfera" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transferi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artikli_sifra_key" ON "Artikli"("sifra");

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_skladisteId_fkey" FOREIGN KEY ("skladisteId") REFERENCES "Skladiste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferi" ADD CONSTRAINT "Transferi_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferi" ADD CONSTRAINT "Transferi_izSkladisteId_fkey" FOREIGN KEY ("izSkladisteId") REFERENCES "Skladiste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferi" ADD CONSTRAINT "Transferi_uSkladisteId_fkey" FOREIGN KEY ("uSkladisteId") REFERENCES "Skladiste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
