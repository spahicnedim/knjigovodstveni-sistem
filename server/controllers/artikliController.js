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

const getArtikliIzSkladista = async (req, res) => {
    try {
        const { skladisteId } = req.query;

        // Fetch articles from 'SkladisteArtikli' including related 'Artikli' and 'ArtikliCijene'
        const artikliIzSkladista = await prisma.skladisteArtikli.findMany({
            where: {
                skladisteId: parseInt(skladisteId),
            },
            include: {
                artikli: true,
                cijena: true,
            },
        });

        // Check if articles are found
        if (!artikliIzSkladista || artikliIzSkladista.length === 0) {
            return res.status(404).json({ message: 'Nema artikala u skladištu.' });
        }

        // Respond with the articles including quantities and prices
        return res.status(200).json(artikliIzSkladista);
    } catch (error) {
        console.error('Greška prilikom dohvata artikala iz skladišta:', error);
        return res.status(500).json({ message: 'Došlo je do greške prilikom dohvata artikala.' });
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
    createArtikl,
    getArtikliIzSkladista
};