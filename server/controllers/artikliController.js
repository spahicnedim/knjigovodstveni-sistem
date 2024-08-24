const prisma = require("../prismaClient");
const {parse} = require("dotenv");

const createArtikl = async (req, res) => {
    const { naziv, sifra, jedinicaMjere, skladisteId, kolicina, cijena } = req.body;
    const parsedSkladisteId = parseInt(skladisteId, 10);


    try {
        const artikl = await prisma.artikli.create({
            data: {
                naziv,
                sifra,
                jedinicaMjere,
                skladisteArtikli: {
                    create: {
                        kolicina: parseFloat(kolicina),
                        skladiste: {
                            connect: { id: parsedSkladisteId }
                        }
                    },

                },
                artikliCijene: {
                    create: {
                        cijena: parseFloat(cijena),
                    },
                },
            },
        });

        res.status(201).json(artikl);
    } catch (error) {
        console.error("Error creating artikl:", error);
        res.status(400).json({ error: "Error creating artikl", details: error.message });
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
    createArtikl,
    updateArtikala
}