const prisma = require("../prismaClient");

const createSkladiste = async (req, res) => {
    const {
        naziv,
        sifra,
        poslovnicaId,
        vrstaSkladistaId,
        companyId
    } = req.body;

    try {
        const skladiste = await prisma.skladiste.create({
            data: {
                naziv,
                sifra,
                poslovnicaId: parseInt(poslovnicaId),
                vrstaSkladistaId: parseInt(vrstaSkladistaId),
                companyId: parseInt(companyId),
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
        naziv,
        sifra,
        poslovnicaId,
        vrstaSkladistaId,
        companyId
    } = req.body;

    try {
        const skladiste = await prisma.skladiste.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                naziv: naziv || undefined,
                sifra: sifra || undefined,
                poslovnicaId: poslovnicaId || undefined,
                vrstaSkladistaId: vrstaSkladistaId || undefined,
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

const getAllSkladista = async (req, res) => {
    try {
        const skladista = await prisma.skladiste.findMany();
        res.status(200).json(skladista);
    } catch (error) {
        console.error("Error fetching skladista:", error);
        res.status(500).json({ error: "Error fetching skladista", details: error.message });
    }
};

module.exports = {
    createSkladiste,
    updateSkladiste,
    getAllSkladista
}