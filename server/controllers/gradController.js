const prisma = require("../prismaClient");

// Controller to get all cities
const getCities = async (req, res) => {
  try {
    const cities = await prisma.gradovi.findMany();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Error fetching cities" });
  }
};

module.exports = {
  getCities,
};
