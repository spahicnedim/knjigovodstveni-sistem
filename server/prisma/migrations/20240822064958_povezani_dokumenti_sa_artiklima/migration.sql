-- CreateTable
CREATE TABLE "_ArtikliDokumenti" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtikliDokumenti_AB_unique" ON "_ArtikliDokumenti"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtikliDokumenti_B_index" ON "_ArtikliDokumenti"("B");

-- AddForeignKey
ALTER TABLE "_ArtikliDokumenti" ADD CONSTRAINT "_ArtikliDokumenti_A_fkey" FOREIGN KEY ("A") REFERENCES "Artikli"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtikliDokumenti" ADD CONSTRAINT "_ArtikliDokumenti_B_fkey" FOREIGN KEY ("B") REFERENCES "Dokumenti"("id") ON DELETE CASCADE ON UPDATE CASCADE;
