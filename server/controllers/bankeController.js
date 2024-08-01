const prisma = require("../prismaClient");

const getBanke = async (req, res) => {
  try {
    const banke = await prisma.banke.findMany();
    res.status(200).json(banke);
  } catch (error) {
    console.error("Error fetching banke:", error);
    res.status(500).json({ error: "Error fetching banke" });
  }
};

module.exports = {
  getBanke,
};
