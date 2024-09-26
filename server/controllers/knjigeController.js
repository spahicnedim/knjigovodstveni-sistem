const prisma = require("../prismaClient");

const getKnjigeWithDokumenti = async (req, res) => {
    const { knjigeId } = req.params;
    const { companyId } = req.query;
    try {
        // Dohvaćanje knjige sa svim pripadajućim dokumentima
        const knjiga = await prisma.knjige.findUnique({
            where: { id: parseInt(knjigeId, 10) },
            include: {
                dokumenti: {
                    where: {companyId: parseInt(companyId, 10)},// Pretpostavljam da imaš relaciju "dokumenta" u modelu knjiga
                    include: {
                        DokumentiArtikli: {
                            include: {
                                artikli: true, // Uključuje podatke o artiklima
                            },
                        },
                        kupacDobavljac: true, // Uključi podatke o kupcu/dobavljaču
                    },
                },
            },
        });

        if (!knjiga) {
            return res.status(404).json({ error: "Knjiga nije pronađena." });
        }

        res.status(200).json({ knjiga });
    } catch (error) {
        console.error("Greška prilikom dohvaćanja knjiga:", error.message);
        res.status(500).json({ error: "Greška prilikom dohvaćanja knjiga", details: error.message });
    }
};

module.exports = {
    getKnjigeWithDokumenti,
};