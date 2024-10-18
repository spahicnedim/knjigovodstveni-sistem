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
                // Dohvati posljednju cijenu artikla
                const lastCijena = await prisma.artikliCijene.findFirst({
                    where: { artikliId: parseInt(artikl.artikliId, 10) },
                    orderBy: { id: "desc" },
                });

                // Postavi nove vrijednosti cijena (samo mijenjamo onu cijenu koja je specificirana)
                const novaCijena = artikl.cijena ? parseFloat(artikl.cijena) : lastCijena?.cijena || null;
                const novaMpcijena = artikl.mpcijena ? parseFloat(artikl.mpcijena) : lastCijena?.mpcijena || null;
                const novaVpcijena = artikl.vpcijena ? parseFloat(artikl.vpcijena) : lastCijena?.vpcijena || null;

                // Kreiraj novi zapis za artikl cijenu
                const newArtiklPrice = await prisma.artikliCijene.create({
                    data: {
                        artikliId: parseInt(artikl.artikliId, 10),
                        cijena: novaCijena,
                        mpcijena: novaMpcijena,
                        vpcijena: novaVpcijena,
                    },
                });

                // Ažuriraj skladište s novom cijenom
                // Dodajemo dodatni kriterij za ažuriranje - `cijenaId` mora odgovarati trenutnoj cijeni koju mijenjamo
                await prisma.skladisteArtikli.updateMany({
                    where: {
                        artikliId: parseInt(artikl.artikliId, 10),
                        skladisteId: parseInt(skladisteId, 10),
                        cijenaId: lastCijena?.id, // Ažuriramo samo artikle sa starom cijenom
                    },
                    data: {
                        cijenaId: newArtiklPrice.id,
                    },
                });
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
