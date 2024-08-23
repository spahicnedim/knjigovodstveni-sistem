const prisma = require("../prismaClient");

const createArtikli = async (req, res) => {
    const {
        naziv,
        sifra,
        jedinicaMjere,
        skladisteId,
        kolicina,
        cijena,
    } = req.body;

    try {
        const artikl = await prisma.artikli.create({
            data: {
                naziv,
                sifra,
                jedinicaMjere,
            },
        });

        await prisma.skladisteArtikli.create({
            data: {
                skladisteId: skladisteId,
                artikliId: artikl.id,
                kolicina: kolicina,
            }
        })

        await prisma.artikliCijene.create({
            data: {
                artikliId: artikl.id,
                cijena: cijena
            }
        })

        res.status(201).json({ artikl });
    } catch (error) {
        console.error("Error creating company:", error);
        res
            .status(400)
            .json({ error: "Error creating company", details: error.message });
    }
};

const updateArtikala = async (req, res) => {
    const { id } = req.params;
    const {
        naziv,
        sifra,
        jedinicaMjere
    } = req.body;

    try {
        const artikl = await prisma.artikli.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv,
                sifra,
                jedinicaMjere,
            },
        });

        res.status(200).json({ artikl });
    } catch (error) {
        console.error("Error updating poslovnica:", error);
        res
            .status(400)
            .json({ error: "Error updating poslovnica", details: error.message });
    }
};

module.exports = {
    createArtikli,
    updateArtikala
}