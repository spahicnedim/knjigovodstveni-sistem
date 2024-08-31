const prisma = require("../prismaClient");

const getPDV = async (req, res) => {
    try {
        const pdv = await prisma.pDV.findMany();
        res.status(200).json(pdv);
    } catch (error) {
        console.error("Error fetching pdv:", error);
        res.status(500).json({ error: "Error fetching pdv" });
    }
};

module.exports = {
    getPDV
}