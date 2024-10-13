const prisma = require('../prismaClient');

exports.processPOS = async (req, res) => {
    const {
        skladisteId,
        artikli
    } = req.body;

    // Pretvaranje JSON stringa u objekt ako je artikli primljen kao string
    const parsedArtikli = typeof artikli === 'string' ? JSON.parse(artikli) : artikli;

    try {

        // Transakcija za skidanje količine artikala sa stanja
        await prisma.$transaction(async (prisma) => {
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
                    // Smanji količinu artikla u skladištu
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
                } else {
                    return res.status(400).json({
                        error: `Artikl sa ID-om ${artikl.artikliId} nije pronađen u skladištu.`,
                    });
                }
            }
        });

        res.status(200).json({ message: "Količina artikala uspješno smanjena sa stanja." });
    } catch (error) {
        console.error("Error updating stock:", error.message);
        res.status(400).json({
            error: "Došlo je do greške prilikom skidanja artikala sa stanja.",
            details: error.message,
        });
    }
};