const prisma = require("../prismaClient");
const { io } = require("../config/socket.io");

const createRacun = async (req, res) => {
  const { nazivId, br_racuna, devizni, companyId } = req.body;

  try {
    const racun = await prisma.racun.create({
      data: {
        nazivId,
        br_racuna,
        devizni,
        companyId: parseInt(companyId, 10),
      },
    });

    io.emit("racunCreated", racun);

    res.status(201).json({ racun });
  } catch (error) {
    console.error("Error creating company:", error);
    res
      .status(400)
      .json({ error: "Error creating company", details: error.message });
  }
};

const getRacuniByCompanyId = async (req, res) => {
  const { companyId } = req.params;

  try {
    const racuni = await prisma.racun.findMany({
      where: { companyId: Number(companyId) },
    });

    res.status(200).json({ racuni });
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res
      .status(400)
      .json({ error: "Error fetching bank accounts", details: error.message });
  }
};

const deleteRacun = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.racun.delete({
      where: { id: Number(id) },
    });

    io.emit("racunDeleted", { id });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting bank account:", error);
    res
      .status(400)
      .json({ error: "Error deleting bank account", details: error.message });
  }
};

module.exports = {
  createRacun,
  getRacuniByCompanyId,
  deleteRacun,
};
