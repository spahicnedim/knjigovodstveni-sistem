const prisma = require("../prismaClient");

// Dohvati artikle iz određene poslovnice
const getArtikli = async (req, res) => {
    const { poslovniceId } = req.query; // Preuzimanje poslovniceId iz query parametra

    if (!poslovniceId) {
        return res.status(400).json({ error: "Poslovnice ID is required" });
    }

    try {
        const artikli = await prisma.artikli.findMany({
            where: {
                poslovniceId: parseInt(poslovniceId), // Filtriranje prema poslovniceId
            },
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
    const { naziv, sifra, jedinicaMjere, poslovniceId } = req.body;

    try {
        const artikl = await prisma.artikli.create({
            data: {
                naziv,
                sifra,
                jedinicaMjere,
                poslovniceId: parseInt(poslovniceId), // Povezivanje artikla s poslovnicom
            },
        });

        res.status(201).json({ artikl });
    } catch (error) {
        console.error("Error creating artikl:", error);
        res.status(400).json({
            error: "Error creating artikl",
            details: error.message,
        });
    }
};

module.exports = {
    getArtikli,
    createArtikl
};