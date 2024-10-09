const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");

const register = async (req, res) => {
  const { email, password, username, roleName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    return res.status(400).json({ error: "Role not found" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role: {
          connect: { id: role.id },
        },
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: "error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user)
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          userId: user.id,
          role: user.roleId,
          email: user.email,
          username: user.username,
          serviceId: user.serviceId,
          poslovniceId: user.poslovniceId
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login };
