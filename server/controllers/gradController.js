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

const createCity = async (req, res) => {
  const { naziv, postanski_broj } = req.body;

  try {
    const city = await prisma.gradovi.create({
      data: {
        naziv,
        postanski_broj: parseInt(postanski_broj, 10),
      },
    });

    res.status(201).json({ city });
  } catch (error) {
    console.error("Error creating City:", error);
    res.status(400).json({
      error: "Error creating City",
      details: error.message,
    });
  }
};

module.exports = {
  getCities,
  createCity,
};
