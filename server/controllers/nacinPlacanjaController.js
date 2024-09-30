const prisma = require("../prismaClient");

const createNacinPlacanja = async (req, res) => {
    const {
        naziv
    } = req.body;

    try {
        const nacinPlacanja = await prisma.nacinPlacanja.create({
            data: {
                naziv,
            },
        });

        res.status(201).json({ nacinPlacanja });
    } catch (error) {
        console.error("Error creating nacinPlacanja:", error);
        res
            .status(400)
            .json({ error: "Error creating nacinPlacanja", details: error.message });
    }
};

const updateNacinPlacanja = async (req, res) => {
    const { id } = req.params;
    const {
        naziv
    } = req.body;

    try {
        const nacinPlacanja = await prisma.nacinPlacanja.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv: naziv || undefined,
            },
        });

        res.status(200).json({ nacinPlacanja });
    } catch (error) {
        console.error("Error updating nacinPlacanja:", error);
        res
            .status(400)
            .json({ error: "Error updating nacinPlacanja", details: error.message });
    }
};

const getAllNacinPlacanja = async (req, res) => {
    try {
        const nacinPlacanja = await prisma.nacinPlacanja.findMany();
        res.status(200).json(nacinPlacanja);
    } catch (error) {
        console.error("Error fetching nacinPlacanja:", error);
        res.status(500).json({ error: "Error fetching nacinPlacanja", details: error.message });
    }
};

module.exports = {
    createNacinPlacanja,
    updateNacinPlacanja,
    getAllNacinPlacanja
}