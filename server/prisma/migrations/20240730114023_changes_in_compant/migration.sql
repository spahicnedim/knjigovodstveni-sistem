-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_sjedisteId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "sjedisteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_sjedisteId_fkey" FOREIGN KEY ("sjedisteId") REFERENCES "Gradovi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
