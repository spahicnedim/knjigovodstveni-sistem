-- AlterTable
ALTER TABLE "Poslovnice" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Poslovnice" ADD CONSTRAINT "Poslovnice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
