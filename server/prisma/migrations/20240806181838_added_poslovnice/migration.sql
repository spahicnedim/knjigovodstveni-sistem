/*
  Warnings:

  - Added the required column `poslovnicaID` to the `Racun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Racun" ADD COLUMN     "poslovnicaID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Poslovnice" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT,
    "adresa" TEXT,
    "IDbroj" TEXT,
    "sjedisteId" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Poslovnice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poslovnice" ADD CONSTRAINT "Poslovnice_sjedisteId_fkey" FOREIGN KEY ("sjedisteId") REFERENCES "Gradovi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poslovnice" ADD CONSTRAINT "Poslovnice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Racun" ADD CONSTRAINT "Racun_poslovnicaID_fkey" FOREIGN KEY ("poslovnicaID") REFERENCES "Poslovnice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
