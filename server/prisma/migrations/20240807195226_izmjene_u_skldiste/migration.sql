-- DropForeignKey
ALTER TABLE "Skladiste" DROP CONSTRAINT "Skladiste_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Skladiste" DROP CONSTRAINT "Skladiste_poslovnicaId_fkey";

-- AlterTable
ALTER TABLE "Skladiste" ALTER COLUMN "poslovnicaId" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Skladiste" ADD CONSTRAINT "Skladiste_poslovnicaId_fkey" FOREIGN KEY ("poslovnicaId") REFERENCES "Poslovnice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skladiste" ADD CONSTRAINT "Skladiste_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
