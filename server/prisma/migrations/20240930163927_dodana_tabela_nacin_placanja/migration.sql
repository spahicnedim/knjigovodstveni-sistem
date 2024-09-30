-- AlterTable
ALTER TABLE "Dokumenti" ADD COLUMN     "nacinPlacanjaId" INTEGER;

-- CreateTable
CREATE TABLE "NacinPlacanja" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "NacinPlacanja_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_nacinPlacanjaId_fkey" FOREIGN KEY ("nacinPlacanjaId") REFERENCES "NacinPlacanja"("id") ON DELETE SET NULL ON UPDATE CASCADE;
