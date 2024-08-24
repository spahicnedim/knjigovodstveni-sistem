const prisma = require("../prismaClient");
const { createArtikl } = require('./artikliController');

const createDokumenti = async (req, res) => {
    const {
        naziv,
        redniBroj,
        poslovniceId,
        skladisteId,
        vrstaDokumentaId,
        companyId,
        artikli, // Nova lista artikala
    } = req.body;

    try {
        // Kreiramo dokument i artikle unutar transakcije
        const dokument = await prisma.$transaction(async (prisma) => {
            const createdDokument = await prisma.dokumenti.create({
                data: {
                    naziv,
                    redniBroj: parseInt(redniBroj),
                    poslovniceId: parseInt(poslovniceId),
                    skladisteId: parseInt(skladisteId),
                    vrstaDokumentaId: parseInt(vrstaDokumentaId),
                    companyId: parseInt(companyId),
                }
            });

            // Kreiramo artikle povezane s dokumentom
            for (const artikl of artikli) {
                await prisma.artikli.create({
                    data: {
                        naziv: artikl.naziv,
                        sifra: artikl.sifra,
                        jedinicaMjere: artikl.jedinicaMjere,
                        skladisteArtikli: {
                            create: {
                                kolicina: parseFloat(artikl.kolicina),
                                skladiste: {
                                    connect: { id: parseInt(skladisteId, 10) }
                                }
                            }
                        },
                        ArtikliCijene: {
                            create: {
                                cijena: parseFloat(artikl.cijena),
                            },
                        },
                        dokumenti: { // Ispravljeni naziv relacije za povezivanje s dokumentom
                            connect: { id: createdDokument.id }// Veza s dokumentom
                        },
                    }
                });
            }

            return createdDokument;
        });

        res.status(201).json({ dokument });
    } catch (error) {
        console.error("Error creating dokument and artikli:", error);
        res.status(400).json({ error: "Error creating dokument and artikli", details: error.message });
    }
};

const updateDokumenta = async (req, res) => {
    const { id } = req.params;
    const {
        naziv,
        redniBroj,
        vrstaDokumentaId
    } = req.body;

    try {
        const dokument = await prisma.dokumenti.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv,
                redniBroj,
                vrstaDokumentaId
            },
        });

        res.status(200).json({ dokument });
    } catch (error) {
        console.error("Error updating dokument:", error);
        res
            .status(400)
            .json({ error: "Error updating dokument", details: error.message });
    }
};

module.exports = {
    createDokumenti,
    updateDokumenta
}