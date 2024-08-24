const prisma = require("../prismaClient");

const createVrstaDokumenta = async (req, res) => {
    const {
        naziv
    } = req.body;

    try {
        const vrstaDokumenta = await prisma.vrstaDokumenta.create({
            data: {
                naziv
            },
        });

        res.status(201).json({ vrstaDokumenta });
    } catch (error) {
        console.error("Error creating vrstaDokumenta:", error);
        res
            .status(400)
            .json({ error: "Error creating vrstaDokumenta", details: error.message });
    }
};

const updateVrstaDokumenta = async (req, res) => {
    const { id } = req.params;
    const {
        naziv
    } = req.body;

    try {
        const vrstaDokumenta = await prisma.vrstaDokumenta.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv
            },
        });

        res.status(200).json({ vrstaDokumenta });
    } catch (error) {
        console.error("Error updating dokument:", error);
        res
            .status(400)
            .json({ error: "Error updating dokument", details: error.message });
    }
};

const getAllVrstaDokumenata = async (req, res) => {
    try {
        const vrsteDokumenata = await prisma.vrstaDokumenta.findMany();
        res.status(200).json(vrsteDokumenata);
    } catch (error) {
        console.error("Error fetching vrsteDokumenata:", error);
        res.status(500).json({ error: "Error fetching vrsteDokumenata", details: error.message });
    }
};

module.exports = {
    createVrstaDokumenta,
    updateVrstaDokumenta,
    getAllVrstaDokumenata
}