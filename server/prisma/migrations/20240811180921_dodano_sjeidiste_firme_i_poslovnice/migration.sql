-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "sjedisteFirmeId" INTEGER;

-- AlterTable
ALTER TABLE "KupacDobavljac" ADD COLUMN     "sjedisteFirmeId" INTEGER;

-- AlterTable
ALTER TABLE "Poslovnice" ADD COLUMN     "sjedisteFirmeId" INTEGER;

-- CreateTable
CREATE TABLE "SjedisteFirme" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "SjedisteFirme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_sjedisteFirmeId_fkey" FOREIGN KEY ("sjedisteFirmeId") REFERENCES "SjedisteFirme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KupacDobavljac" ADD CONSTRAINT "KupacDobavljac_sjedisteFirmeId_fkey" FOREIGN KEY ("sjedisteFirmeId") REFERENCES "SjedisteFirme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poslovnice" ADD CONSTRAINT "Poslovnice_sjedisteFirmeId_fkey" FOREIGN KEY ("sjedisteFirmeId") REFERENCES "SjedisteFirme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
