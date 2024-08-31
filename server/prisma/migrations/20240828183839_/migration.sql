-- DropForeignKey
ALTER TABLE "PDV" DROP CONSTRAINT "PDV_dokumentId_fkey";

-- AlterTable
ALTER TABLE "PDV" ALTER COLUMN "dokumentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PDV" ADD CONSTRAINT "PDV_dokumentId_fkey" FOREIGN KEY ("dokumentId") REFERENCES "Dokumenti"("id") ON DELETE SET NULL ON UPDATE CASCADE;
