const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const cookieParser = require("cookie-parser");
const citiesRoute = require("./routes/gradRoutes");
const racunRoute = require("./routes/racunRoutes");
const djelatnostRoute = require("./routes/djelatnostRoutes");
const JSONBigIntMiddleware = require("./middlewares/jsonStringifyMiddleware");
const drzavaRoute = require("./routes/drzavaRoutes");
const bankeRoute = require("./routes/bankeRoutes");
const kupacDobavljacRoute = require("./routes/kupacDobavljacRoutes");
const poslovniceRoute = require("./routes/poslovniceRoutes");
const skladisteRoute = require("./routes/skladisteRoutes");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(JSONBigIntMiddleware);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/gradovi", citiesRoute);
app.use("/api/racun", racunRoute);
app.use("/api/djelatnost", djelatnostRoute);
app.use("/api/drzava", drzavaRoute);
app.use("/api/banke", bankeRoute);
app.use("/api/kupacDobavljac", kupacDobavljacRoute)
app.use("/api/poslovnice", poslovniceRoute);
app.use("/api/skladiste", skladisteRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
