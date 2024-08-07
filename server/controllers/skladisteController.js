const prisma = require("../prismaClient");

const createSkladiste = async (req, res) => {
    const {
        name,
        sifra,
        poslovnicaId,
        companyId
    } = req.body;

    try {
        const skladiste = await prisma.skladiste.create({
            data: {
                name,
                sifra,
                poslovnicaId,
                companyId,
            },
        });

        res.status(201).json({ skladiste });
    } catch (error) {
        console.error("Error creating company:", error);
        res
            .status(400)
            .json({ error: "Error creating company", details: error.message });
    }
};

const updateSkladiste = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        sifra,
        poslovnicaId,
        companyId
    } = req.body;

    try {
        const skladiste = await prisma.skladiste.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                name: name || undefined,
                sifra: sifra || undefined,
                poslovnicaId: poslovnicaId || undefined,
                companyId: companyId || undefined,
            },
        });

        res.status(200).json({ skladiste });
    } catch (error) {
        console.error("Error updating skladiste:", error);
        res
            .status(400)
            .json({ error: "Error updating skladiste", details: error.message });
    }
};

module.exports = {
    createSkladiste,
    updateSkladiste
}