const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  getUserByService,
  assignUserToCompany,
  getUserCompanies,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/", authenticate, getUser);

router.post("/", authenticate, createUser);

router.get("/all", authenticate, getAllUsers);
router.get("/:serviceId/users", getUserByService);
router.post("/:userId/assign", assignUserToCompany);
router.get("/:userId/companies", getUserCompanies);

module.exports = router;
