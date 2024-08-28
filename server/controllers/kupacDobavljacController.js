const prisma = require("../prismaClient");

const createKupacDobavljac = async (req, res) => {
    const {
        name,
        adresa,
        sjedisteId,
        drzavaId,
        PDVbroj,
        IDbroj,
        valuta,
        djelatnostId,
        obveznikPDV,
        telefon,
        fax,
        email,
        web,
        kupac,
        dobavljac,
        companyId,
    } = req.body;

    try {
        const kupacDobavljac = await prisma.kupacDobavljac.create({
            data: {
                name,
                adresa: adresa || null,
                sjedisteId: sjedisteId || null,
                drzavaId: drzavaId || null,
                PDVbroj: PDVbroj ? PDVbroj.toString() : null,
                IDbroj: IDbroj ? IDbroj.toString() : null,
                valuta: valuta || null,
                djelatnostId: djelatnostId || null,
                obveznikPDV: obveznikPDV !== undefined ? obveznikPDV : null,
                telefon: telefon ? telefon.toString() : null,
                fax: fax ? fax.toString() : null,
                email: email || null,
                web: web || null,
                kupac: kupac !== undefined ? kupac : null,
                dobavljac: dobavljac !== undefined ? dobavljac : null,
                companyId: parseInt(companyId)
            },
        });

        res.status(201).json({ kupacDobavljac });
    } catch (error) {
        console.error("Error creating company:", error);
        res
            .status(400)
            .json({ error: "Error creating company", details: error.message });
    }
};

const updateKupacDobavljac = async (req, res) => {
    const { id } = req.params; // Pretpostavljam da koristite `id` kao parametar
    const {
        name,
        adresa,
        sjedisteId,
        drzavaId,
        PDVbroj,
        IDbroj,
        valuta,
        djelatnostId,
        obveznikPDV,
        telefon,
        fax,
        email,
        web,
        kupac,
        dobavljac,
    } = req.body;

    try {
        const kupacDobavljac = await prisma.kupacDobavljac.update({
            where: {
                id: parseInt(id, 10), // Ensure id is correctly parsed to an integer
            },
            data: {
                name: name || undefined,
                adresa: adresa || undefined,
                sjedisteId: sjedisteId || undefined,
                drzavaId: drzavaId || undefined,
                PDVbroj: PDVbroj ? PDVbroj.toString() : undefined,
                IDbroj: IDbroj ? IDbroj.toString() : undefined,
                valuta: valuta || undefined,
                djelatnostId: djelatnostId || undefined,
                obveznikPDV: obveznikPDV !== undefined ? obveznikPDV : undefined,
                telefon: telefon ? telefon.toString() : undefined,
                fax: fax ? fax.toString() : undefined,
                email: email || undefined,
                web: web || undefined,
                kupac: kupac !== undefined ? kupac : undefined,
                dobavljac: dobavljac !== undefined ? dobavljac : undefined,
            },
        });

        res.status(200).json({ kupacDobavljac });
    } catch (error) {
        console.error("Error updating kupac/dobavljac:", error);
        res
            .status(400)
            .json({ error: "Error updating kupac/dobavljac", details: error.message });
    }
};

const getKupciDobavljaci = async (req, res) => {
    try {
        const kupciDobavljaci = await prisma.kupacDobavljac.findMany({
            where: {
                companyId: parseInt(req.query.companyId, 10), // Pretpostavljam da šaljete companyId kao query parametar
            }
        });

        res.status(200).json({ kupciDobavljaci });
    } catch (error) {
        console.error("Error fetching kupci/dobavljaci:", error);
        res
            .status(400)
            .json({ error: "Error fetching kupci/dobavljaci", details: error.message });
    }
};

module.exports = {
    createKupacDobavljac,
    updateKupacDobavljac,
    getKupciDobavljaci
}