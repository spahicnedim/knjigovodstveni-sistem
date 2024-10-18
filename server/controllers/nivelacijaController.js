const prisma = require("../prismaClient");

const createNivelacija = async (req, res) => {
    const {
        redniBroj,
        vrstaDokumentaId,
        poslovniceId,
        skladisteId,
        companyId,
        datumNivelacije,
        artikli,
    } = req.body;

    // Pretvaranje JSON stringa u objekt
    const parsedArtikli = JSON.parse(artikli);

    try {
        const activeGodina = await prisma.godine.findFirst({
            where: { status: true },
        });

        if (!activeGodina) {
            return res.status(404).json({ message: "Nema aktivne godine." });
        }

        const validDatumNivelacije = new Date(datumNivelacije);

        // Kreiraj dokument nivelacije
        const dokument = await prisma.$transaction(async (prisma) => {
            const createdDokument = await prisma.dokumenti.create({
                data: {
                    redniBroj,
                    poslovniceId: parseInt(poslovniceId, 10),
                    skladisteId: parseInt(skladisteId, 10),
                    companyId: parseInt(companyId, 10),
                    datumIzdavanjaDokumenta: validDatumNivelacije,
                    vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
                    godineId: activeGodina.id,
                },
            });

            // Obradi artikle i ažuriraj cijene
            for (const artikl of parsedArtikli) {
                // Pronalaženje postojeće cijene artikla
                const existingArtiklWithSamePrice = await prisma.artikliCijene.findFirst({
                    where: {
                        artikliId: parseInt(artikl.artikliId, 10),
                        mpcijena: parseFloat(artikl.mpcijena), // Uzimamo MPC cijenu
                    },
                });

                if (existingArtiklWithSamePrice) {
                    // Ako postoji cijena, samo ažuriraj skladište s novom cijenom
                    await prisma.skladisteArtikli.updateMany({
                        where: {
                            artikliId: parseInt(artikl.artikliId, 10),
                            skladisteId: parseInt(skladisteId, 10),
                        },
                        data: {
                            cijenaId: existingArtiklWithSamePrice.id,  // Ažuriraj skladište da koristi ovu cijenu
                        },
                    });
                } else {
                    // Ako ne postoji cijena, kreiraj novu cijenu
                    const newArtiklPrice = await prisma.artikliCijene.create({
                        data: {
                            artikliId: parseInt(artikl.artikliId, 10),
                            mpcijena: parseFloat(artikl.mpcijena),
                        },
                    });

                    // Ažuriraj skladište s novom cijenom
                    await prisma.skladisteArtikli.updateMany({
                        where: {
                            artikliId: parseInt(artikl.artikliId, 10),
                            skladisteId: parseInt(skladisteId, 10),
                        },
                        data: {
                            cijenaId: newArtiklPrice.id,
                        },
                    });
                }
            }

            return createdDokument;
        });

        res.status(201).json({ dokument });
    } catch (error) {
        console.error("Error creating nivelacija dokument:", error.message);
        res.status(400).json({
            error: "Error creating nivelacija dokument",
            details: error.message,
        });
    }
};

module.exports = {
    createNivelacija,
};
