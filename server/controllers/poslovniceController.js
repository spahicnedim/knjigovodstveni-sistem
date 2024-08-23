const prisma = require("../prismaClient");

const createPoslovnice = async (req, res) => {
    const {
        naziv,
        adresa,
        IDbroj,
        sjedisteId,
        companyId,
    } = req.body;

    try {
        const poslovnica = await prisma.poslovnice.create({
            data: {
                naziv,
                adresa: adresa || null,
                IDbroj: IDbroj ? IDbroj.toString() : null,
                sjedisteId: sjedisteId || null,
                companyId: parseInt(companyId),
            },
        });

        res.status(201).json({ poslovnica });
    } catch (error) {
        console.error("Error creating company:", error);
        res
            .status(400)
            .json({ error: "Error creating company", details: error.message });
    }
};

const updatePoslovnice = async (req, res) => {
    const { id } = req.params;
    const {
        naziv,
        adresa,
        IDbroj,
        sjedisteId,
    } = req.body;

    try {
        const poslovnica = await prisma.poslovnice.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv: naziv || undefined,
                adresa: adresa || undefined,
                IDbroj: IDbroj ? IDbroj.toString() : undefined,
                sjedisteId: sjedisteId || undefined,
            },
        });

        res.status(200).json({ poslovnica });
    } catch (error) {
        console.error("Error updating poslovnica:", error);
        res
            .status(400)
            .json({ error: "Error updating poslovnica", details: error.message });
    }
};

const getAllPoslovnice = async (req, res) => {
    try {
        const poslovnice = await prisma.poslovnice.findMany();
        res.status(200).json(poslovnice);
    } catch (error) {
        console.error("Error fetching poslovnice:", error);
        res.status(500).json({ error: "Error fetching poslovnice", details: error.message });
    }
};

module.exports = {
    createPoslovnice,
    updatePoslovnice,
    getAllPoslovnice
}