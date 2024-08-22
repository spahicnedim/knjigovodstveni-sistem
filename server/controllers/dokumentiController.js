const prisma = require("../prismaClient");

const createDokumenti = async (req, res) => {
    const {
        naziv,
        datum,
        redniBroj
    } = req.body;

    try {
        const dokument = await prisma.dokumenti.create({
            data: {
                naziv,
                datum,
                redniBroj
            },
        });

        res.status(201).json({ dokument });
    } catch (error) {
        console.error("Error creating dokument:", error);
        res
            .status(400)
            .json({ error: "Error creating dokument", details: error.message });
    }
};

const updateDokumenta = async (req, res) => {
    const { id } = req.params;
    const {
        naziv,
        datum,
        redniBroj
    } = req.body;

    try {
        const dokument = await prisma.dokumenti.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv,
                datum,
                redniBroj
            },
        });

        res.status(200).json({ dokument });
    } catch (error) {
        console.error("Error updating dokument:", error);
        res
            .status(400)
            .json({ error: "Error updating dokument", details: error.message });
    }
};

module.exports = {
    createDokumenti,
    updateDokumenta
}