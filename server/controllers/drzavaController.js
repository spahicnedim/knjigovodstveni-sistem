const prisma = require("../prismaClient");

const getDrzava = async (req, res) => {
  try {
    const drzave = await prisma.drzave.findMany();
    res.status(200).json(drzave);
  } catch (error) {
    console.error("Error fetching drzave:", error);
    res.status(500).json({ error: "Error fetching drzave" });
  }
};

const createDrzava = async (req, res) => {
  const { naziv } = req.body;

  try {
    const drzava = await prisma.drzave.create({
      data: {
        naziv,
      },
    });

    res.status(201).json({ drzava });
  } catch (error) {
    console.error("Error creating Drzava:", error);
    res.status(400).json({
      error: "Error creating Drzava",
      details: error.message,
    });
  }
};

module.exports = {
  getDrzava,
  createDrzava,
};
