const prisma = require("../prismaClient");

const createValute = async (req, res) => {
    const {
        naziv
    } = req.body;

    try {
        const valuta = await prisma.valuta.create({
            data: {
                naziv,
            },
        });

        res.status(201).json({ valuta });
    } catch (error) {
        console.error("Error creating valuta:", error);
        res
            .status(400)
            .json({ error: "Error creating valuta", details: error.message });
    }
};

const updateValuta = async (req, res) => {
    const { id } = req.params;
    const {
        naziv
    } = req.body;

    try {
        const valuta = await prisma.valuta.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv: naziv || undefined,
            },
        });

        res.status(200).json({ valuta });
    } catch (error) {
        console.error("Error updating valuta:", error);
        res
            .status(400)
            .json({ error: "Error updating valuta", details: error.message });
    }
};

const getAllValute = async (req, res) => {
    try {
        const valute = await prisma.valuta.findMany();
        res.status(200).json(valute);
    } catch (error) {
        console.error("Error fetching valute:", error);
        res.status(500).json({ error: "Error fetching valute", details: error.message });
    }
};

module.exports = {
    createValute,
    updateValuta,
    getAllValute
}