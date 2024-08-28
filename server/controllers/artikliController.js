const prisma = require("../prismaClient");

// Dohvati sve artikle
const getArtikli = async (req, res) => {
    try {
        const artikli = await prisma.artikli.findMany({
            include: {
                ArtikliCijene: true,  // Uključivanje povezane tabele ArtikliCijene
                skladisteArtikli: true // Uključivanje povezane tabele skladisteArtikli
            }
        });
        res.status(200).json(artikli);
    } catch (error) {
        console.error("Error fetching artikli:", error);
        res.status(500).json({ error: "Error fetching artikli" });
    }
};

// Kreiraj novi artikl
const createArtikl = async (req, res) => {
    const { naziv, sifra, jedinicaMjere, kolicina, cijena } = req.body;

    try {
        // Pokrećemo transakciju
        const artikl = await prisma.$transaction(async (prisma) => {
            // Provjeravamo postoji li artikl sa istom šifrom
            const existingArtikl = await prisma.artikli.findUnique({
                where: { sifra }
            });

            if (existingArtikl) {
                // Ako artikl postoji, ažuriramo količinu u skladistu i cijenu
                await prisma.skladisteArtikli.update({
                    where: { artiklId: existingArtikl.id },
                    data: {
                        kolicina: {
                            increment: parseFloat(kolicina) // Povećavamo postojeću količinu
                        }
                    }
                });

                await prisma.ArtikliCijene.create({
                    where: { artiklId: existingArtikl.id },
                    data: {
                        cijena: parseFloat(cijena) // Ažuriramo cijenu artikla
                    }
                });

                return existingArtikl; // Vraćamo postojeći artikl
            } else {
                // Ako artikl ne postoji, kreiramo novi artikl zajedno sa količinom i cijenom
                const newArtikl = await prisma.artikli.create({
                    data: {
                        naziv,
                        sifra,
                        jedinicaMjere,
                        skladisteArtikli: {
                            create: {
                                kolicina: parseFloat(kolicina),
                            }
                        },
                        ArtikliCijene: {
                            create: {
                                cijena: parseFloat(cijena),
                            }
                        }
                    }
                });

                return newArtikl; // Vraćamo novokreirani artikl
            }
        });

        res.status(201).json(artikl);
    } catch (error) {
        console.error("Error creating or updating artikl:", error);
        res.status(400).json({ error: "Error creating or updating artikl", details: error.message });
    }
};

module.exports = {
    getArtikli,
    createArtikl
};