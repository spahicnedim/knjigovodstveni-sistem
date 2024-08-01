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

module.exports = {
  getDrzava,
};
