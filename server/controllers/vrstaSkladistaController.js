const prisma = require("../prismaClient");

const createVrstaSkladista = async (req, res) => {
    const {
        naziv,
    } = req.body;

    try {
        const vrstaSkladista = await prisma.vrstaSkladista.create({
            data: {
                naziv,
            },
        });

        res.status(201).json({ vrstaSkladista });
    } catch (error) {
        console.error("Error creating vrstaSkladista:", error);
        res
            .status(400)
            .json({ error: "Error creating vrstaSkladista", details: error.message });
    }
};

const getAllVrsteSkladista = async (req, res) => {
    try {
        const vrsteSkladista = await prisma.vrstaSkladista.findMany();
        res.status(200).json(vrsteSkladista);
    } catch (error) {
        console.error("Error fetching vrsteSkladista:", error);
        res.status(500).json({ error: "Error fetching vrsteSkladista", details: error.message });
    }
};


module.exports = {
    createVrstaSkladista,
    getAllVrsteSkladista
}