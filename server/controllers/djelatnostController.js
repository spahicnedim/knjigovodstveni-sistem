const prisma = require("../prismaClient");

const createOrUpdateDjelatnost = async (req, res) => {
  const { naziv, sifra, companyId } = req.body;

  try {
    const existingDjelatnost = await prisma.djelatnost.findFirst({
      where: { companyId: parseInt(companyId, 10) },
    });

    let djelatnost;
    if (existingDjelatnost) {
      // If Djelatnost exists, update it (optional)
      djelatnost = await prisma.djelatnost.update({
        where: { id: existingDjelatnost.id },
        data: { naziv, sifra: parseFloat(sifra) },
      });
    } else {
      // Create a new Djelatnost
      djelatnost = await prisma.djelatnost.create({
        data: {
          naziv,
          sifra: parseFloat(sifra),
          companyId: parseInt(companyId, 10),
        },
      });
    }

    res.status(201).json({ djelatnost });
  } catch (error) {
    console.error("Error creating or updating Djelatnost:", error);
    res.status(400).json({
      error: "Error creating or updating Djelatnost",
      details: error.message,
    });
  }
};

const getDjelatnostByCompanyId = async (req, res) => {
  const { companyId } = req.params;

  try {
    const djelatnost = await prisma.djelatnost.findUnique({
      where: {
        companyId: parseInt(companyId, 10),
      },
    });

    if (!djelatnost) {
      return res.status(200).json({ message: "Djelatnost not found" });
    }

    res.json(djelatnost);
  } catch (error) {
    console.error("Error fetching Djelatnost by company ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDjelatnosti = async (req, res) => {
  try {
    const djelatnost = await prisma.djelatnost.findMany();
    res.status(200).json(djelatnost);
  } catch (error) {
    console.error("Error fetching djelatnost:", error);
    res.status(500).json({ error: "Error fetching djelatnost" });
  }
};

module.exports = {
  createOrUpdateDjelatnost,
  getDjelatnostByCompanyId,
  getDjelatnosti,
};
