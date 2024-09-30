const prisma = require("../prismaClient");

const createFakture = async (req, res) => {
    const {
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
        nacinPlacanjaId,
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


        const validDatumIzdavanja = new Date(datumIzdavanjaDokumenta);
        const validDatumKreiranja = new Date(datumKreiranjaKalkulacije);

        // Kreiranje dokumenta i povezivanje artikala
        const dokument = await prisma.$transaction(async (prisma) => {
            const createdDokument = await prisma.dokumenti.create({
                data: {
                    redniBroj,
                    poslovniceId: parseInt(poslovniceId, 10),
                    skladisteId: parseInt(skladisteId, 10),
                    vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
                    companyId: parseInt(companyId, 10),
                    kupacDobavljacId: parseInt(kupacDobavljacId, 10),
                    pDVId: parseInt(pDVId, 10),
                    datumIzdavanjaDokumenta: validDatumIzdavanja,
                    datumKreiranjaKalkulacije: validDatumKreiranja,
                    valutaId: parseInt(valutaId, 10),
                    nacinPlacanjaId: parseInt(nacinPlacanjaId, 10),
                    godineId: activeGodina.id,
                },
            });

            // Povezivanje artikala sa dokumentom
            for (const artikl of parsedArtikli) {
                const existingArtiklInStock = await prisma.skladisteArtikli.findUnique({
                    where: {
                        skladisteId_artikliId: {
                            skladisteId: parseInt(skladisteId, 10),
                            artikliId: parseInt(artikl.artikliId, 10),
                        },
                    },
                });

                if (existingArtiklInStock) {
                    await prisma.skladisteArtikli.update({
                        where: {
                            skladisteId_artikliId: {
                                skladisteId: parseInt(skladisteId, 10),
                                artikliId: parseInt(artikl.artikliId, 10),
                            },
                        },
                        data: {
                            kolicina: {
                                decrement: parseFloat(artikl.kolicina),
                            },
                        },
                    });
                 }

                // Dohvati posljednju cijenu na osnovu najvećeg id-a
                const lastCijena = await prisma.artikliCijene.findFirst({
                    where: { artikliId: parseInt(artikl.artikliId, 10) },
                    orderBy: { id: 'desc' }, // Dohvati zadnju cijenu na osnovu id-a
                });

                // Postavi cijene samo ako nisu nula; ako jesu, koristi postojeće vrijednosti
                const novaCijena = parseFloat(artikl.cijena) || lastCijena?.cijena || 0;
                const novaMpcijena = parseFloat(artikl.mpcijena) || lastCijena?.mpcijena || 0;
                const novaVpcijena = parseFloat(artikl.vpcijena) || lastCijena?.vpcijena || 0;

                // Provjeri da li su cijene promijenjene u odnosu na zadnje cijene
                const arePricesDifferent =
                    (artikl.cijena && novaCijena !== lastCijena?.cijena) ||
                    (artikl.mpcijena && novaMpcijena !== lastCijena?.mpcijena) ||
                    (artikl.vpcijena && novaVpcijena !== lastCijena?.vpcijena);

                if (arePricesDifferent) {
                    await prisma.artikliCijene.create({
                        data: {
                            artikliId: parseInt(artikl.artikliId, 10),
                            cijena: novaCijena,
                            mpcijena: novaMpcijena,
                            vpcijena: novaVpcijena,
                        },
                    });
                }

                await prisma.dokumentiArtikli.create({
                    data: {
                        dokumentId: createdDokument.id,
                        artikliId: parseInt(artikl.artikliId, 10),
                        kolicina: parseFloat(artikl.kolicina),
                        cijena: parseFloat(artikl.cijena),
                        mpcijena: parseFloat(artikl.mpcijena),
                        vpcijena: parseFloat(artikl.vpcijena),
                        popust: parseFloat(artikl.popust)
                    },
                });
            }

            let knjigaId;
            if (vrstaDokumentaId == 3) {
                knjigaId = 2; // KUF ID
            }


            // Update dokumenta s knjigeId
            await prisma.dokumenti.update({
                where: { id: createdDokument.id },
                data: {
                    knjigeId: knjigaId,
                },
            });
            return createdDokument;
        });

        res.status(201).json({ dokument });
    } catch (error) {
        console.error(
            "Error creating dokument and connecting artikli:",
            error.message
        );
        res.status(400).json({
            error: "Error creating dokument and connecting artikli",
            details: error.message,
        });
    }
};

module.exports = {
    createFakture
}