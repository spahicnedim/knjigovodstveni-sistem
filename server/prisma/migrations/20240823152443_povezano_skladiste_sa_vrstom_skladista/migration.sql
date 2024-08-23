-- AlterTable
ALTER TABLE "Skladiste" ADD COLUMN     "vrstaSkladistaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Skladiste" ADD CONSTRAINT "Skladiste_vrstaSkladistaId_fkey" FOREIGN KEY ("vrstaSkladistaId") REFERENCES "VrstaSkladista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
