const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getActiveGodina = async (req, res) => {
    try {
        const activeGodina = await prisma.godine.findFirst({
            where: { status: true }, // Vraca prvu godinu kojoj je status true
        });

        if (activeGodina) {
            res.json(activeGodina);
        } else {
            res.status(404).json({ message: 'Nema aktivne godine.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvaćanja aktivne godine.', error });
    }
};

const getGodine = async (req, res) => {
    try {
        // Dohvati sve godine iz baze
        const godine = await prisma.godine.findMany();

        res.json(godine)
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvaćanja godina.', error });
    }
};


module.exports = {
    getActiveGodina,
    getGodine
};