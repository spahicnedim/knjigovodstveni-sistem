const prisma = require("../prismaClient");

const getRoles = async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
};

module.exports = { getRoles };
