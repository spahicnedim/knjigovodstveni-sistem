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
        pDVId,
        datumIzdavanjaDokumenta,
        datumKreiranjaKalkulacije,
        valutaId,
        artikli, // JSON string koji treba parsirati
    } = req.body;

    // Pretvaranje JSON stringa u objekt
    const parsedArtikli = JSON.parse(artikli);

    try {
        // Provjeravamo je li fajl uploadovan
        const file = req.file;
        let filePath = null;
        if (file) {
            filePath = file.path; // Putanja fajla
        }

        const validDatumIzdavanja = new Date(datumIzdavanjaDokumenta);
        const validDatumKreiranja = new Date(datumKreiranjaKalkulacije);

        const dokument = await prisma.$transaction(async (prisma) => {
            const createdDokument = await prisma.dokumenti.create({
                data: {
                    naziv,
                    redniBroj: parseInt(redniBroj, 10),
                    poslovniceId: parseInt(poslovniceId, 10),
                    skladisteId: parseInt(skladisteId, 10),
                    vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
                    companyId: parseInt(companyId, 10),
                    kupacDobavljacId: parseInt(kupacDobavljacId, 10),
                    pDVId: parseInt(pDVId, 10),
                    datumIzdavanjaDokumenta: validDatumIzdavanja,
                    datumKreiranjaKalkulacije: validDatumKreiranja,
                    valutaId: parseInt(valutaId, 10),
                    filePath: filePath, // Putanja do fajla
                }
            });

            for (const artikl of parsedArtikli) {
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
                            cijena: parseFloat(artikl.cijena),
                            mpcijena: parseFloat(artikl.mpcijena)
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
                            cijena: parseFloat(artikl.cijena),
                            mpcijena: parseFloat(artikl.mpcijena)
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
        vrstaDokumentaId,
        datumIzdavanjaDokumenta,
        datumKreiranjaKalkulacije
    } = req.body;

    try {

        const validDatumIzdavanja = new Date(datumIzdavanjaDokumenta);
        const validDatumKreiranja = new Date(datumKreiranjaKalkulacije);


        const dokument = await prisma.dokumenti.update({

            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv,
                redniBroj,
                vrstaDokumentaId,
                datumIzdavanjaDokumenta:validDatumIzdavanja,
                datumKreiranjaKalkulacije: datumKreiranjaKalkulacije
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

const getAllDokumenti = async (req, res) => {
    const { skladisteId } = req.query;

    try {
        if (!skladisteId) {
            return res.status(400).json({ error: "Missing skladisteId query parameter" });
        }

        const dokumenti = await prisma.dokumenti.findMany({
            where: {
                skladisteId: parseInt(skladisteId, 10),
            },
            include: {
                artikli: true, // Ovo uključuje povezane artikle za svaki dokument
            },
        });

        res.status(200).json({ dokumenti });
    } catch (error) {
        console.error("Error fetching dokumenti:", error.message);
        res.status(400).json({ error: "Error fetching dokumenti", details: error.message });
    }
};

module.exports = {
    createDokumenti,
    updateDokumenta,
    getAllDokumenti
}