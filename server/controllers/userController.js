const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");

const createUser = async (req, res) => {
  const { email, password, username, roleName, serviceId, companyId } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role: {
          connect: { id: role.id },
        },
        service: serviceId ? { connect: { id: serviceId } } : undefined,
        companies: companyId ? { connect: { id: companyId } } : undefined,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const users = await prisma.user.findMany({
      where: { serviceId: parseInt(serviceId) },
      include: { companies: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignUserToCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const { companyId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const company = await prisma.company.findUnique({
      where: { id: parseInt(companyId) },
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        companies: {
          connect: { id: parseInt(companyId) },
        },
      },
    });
    res.status(200).json({ userId, companyId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCompanies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { companies: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserByService,
  assignUserToCompany,
  getUserCompanies,
};
