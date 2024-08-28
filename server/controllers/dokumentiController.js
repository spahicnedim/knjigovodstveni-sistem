const prisma = require("../prismaClient");
const { Decimal } = require('decimal.js'); // Dodajte ovu liniju ako koristite Decimal.js

const createDokumenti = async (req, res) => {
    const {
        naziv,
        redniBroj,
        poslovniceId,
        skladisteId,
        vrstaDokumentaId,
        companyId,
        kupacDobavljacId,
        artikli, // Lista objekata sa {id, kolicina, cijena}
    } = req.body;

    try {
        if (!naziv || !redniBroj || !poslovniceId || !skladisteId || !vrstaDokumentaId || !companyId || !Array.isArray(artikli)) {
            return res.status(400).json({ error: "Missing or invalid required fields" });
        }

        const dokument = await prisma.$transaction(async (prisma) => {
            const createdDokument = await prisma.dokumenti.create({
                data: {
                    naziv,
                    redniBroj: parseInt(redniBroj, 10),
                    poslovniceId: parseInt(poslovniceId, 10),
                    skladisteId: parseInt(skladisteId, 10),
                    vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
                    companyId: parseInt(companyId, 10),
                    kupacDobavljacId: parseInt(kupacDobavljacId, 10)
                }
            });

            for (const artikl of artikli) {
                const existingArtiklInStock = await prisma.skladisteArtikli.findUnique({
                    where: {
                        skladisteId_artikliId: {
                            skladisteId: parseInt(skladisteId, 10),
                            artikliId: parseInt(artikl.id, 10)
                        }
                    }
                });

                if (existingArtiklInStock) {
                    await prisma.skladisteArtikli.update({
                        where: {
                            skladisteId_artikliId: {
                                skladisteId: parseInt(skladisteId, 10),
                                artikliId: parseInt(artikl.id, 10)
                            }
                        },
                        data: {
                            kolicina: {
                                increment: parseFloat(artikl.kolicina)
                            }
                        }
                    });

                    await prisma.artikliCijene.create({
                        data: {
                            artikliId: parseInt(artikl.id, 10),
                            cijena: parseFloat(artikl.cijena)
                        }
                    });
                } else {
                    await prisma.skladisteArtikli.create({
                        data: {
                            artikli: {
                                connect: { id: parseInt(artikl.id, 10) }
                            },
                            skladiste: {
                                connect: { id: parseInt(skladisteId, 10) }
                            },
                            kolicina: parseFloat(artikl.kolicina),
                        }
                    });

                    await prisma.artikliCijene.create({
                        data: {
                            artikliId: parseInt(artikl.id, 10),
                            cijena: parseFloat(artikl.cijena)
                        }
                    });
                }
            }

            return createdDokument;
        });

        res.status(201).json({ dokument });
    } catch (error) {
        console.error("Error creating dokument and connecting artikli:", error.message);
        res.status(400).json({ error: "Error creating dokument and connecting artikli", details: error.message });
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