const prisma = require("../prismaClient");

const createService = async (req, res) => {
  const { name, ownerId } = req.body;
  try {
    const service = await prisma.service.create({
      data: {
        name,
        ownerId,
      },
    });

    res.status(201).json({ service });
  } catch (error) {
    res.status(400).json({ error: "Error creating service" });
  }
};

const getAllServices = async (req, res) => {
  const servisi = await prisma.service.findMany();
  res.json(servisi);
};

const getServisById = async (req, res) => {
  const { id } = req.params;
  try {
    const servis = await prisma.service.findUnique({
      where: { id: parseInt(id) },
    });
    if (!servis) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(servis);
  } catch (error) {
    res.status(500).json({ error: "Error fetching service" });
  }
};

module.exports = { createService, getAllServices, getServisById };
