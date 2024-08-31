-- CreateTable
CREATE TABLE "PDV" (
    "id" SERIAL NOT NULL,
    "stopaPDV" INTEGER NOT NULL,
    "Akrivan" BOOLEAN NOT NULL,
    "dokumentId" INTEGER NOT NULL,

    CONSTRAINT "PDV_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PDV" ADD CONSTRAINT "PDV_dokumentId_fkey" FOREIGN KEY ("dokumentId") REFERENCES "Dokumenti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
