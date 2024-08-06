-- CreateTable
CREATE TABLE "Skladiste" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT,
    "sifra" TEXT,
    "poslovnicaId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Skladiste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skladiste" ADD CONSTRAINT "Skladiste_poslovnicaId_fkey" FOREIGN KEY ("poslovnicaId") REFERENCES "Poslovnice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skladiste" ADD CONSTRAINT "Skladiste_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
