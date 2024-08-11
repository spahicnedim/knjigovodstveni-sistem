-- AlterTable
ALTER TABLE "Artikli" ADD COLUMN     "godineId" INTEGER;

-- AlterTable
ALTER TABLE "SkladisteArtikli" ADD COLUMN     "godineId" INTEGER;

-- CreateTable
CREATE TABLE "Godine" (
    "id" SERIAL NOT NULL,
    "naziv" INTEGER NOT NULL,

    CONSTRAINT "Godine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dokumenti" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "godineId" INTEGER,
    "companyId" INTEGER,
    "poslovniceId" INTEGER,
    "skladisteId" INTEGER,

    CONSTRAINT "Dokumenti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Knjige" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "godineId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "Knjige_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Godine_naziv_key" ON "Godine"("naziv");

-- AddForeignKey
ALTER TABLE "Artikli" ADD CONSTRAINT "Artikli_godineId_fkey" FOREIGN KEY ("godineId") REFERENCES "Godine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkladisteArtikli" ADD CONSTRAINT "SkladisteArtikli_godineId_fkey" FOREIGN KEY ("godineId") REFERENCES "Godine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_godineId_fkey" FOREIGN KEY ("godineId") REFERENCES "Godine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_poslovniceId_fkey" FOREIGN KEY ("poslovniceId") REFERENCES "Poslovnice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_skladisteId_fkey" FOREIGN KEY ("skladisteId") REFERENCES "Skladiste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Knjige" ADD CONSTRAINT "Knjige_godineId_fkey" FOREIGN KEY ("godineId") REFERENCES "Godine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Knjige" ADD CONSTRAINT "Knjige_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
