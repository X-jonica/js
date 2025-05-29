const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const inscriptionRoutes = require("./routes/inscriptionRoutes");
const candidatRoutes = require("./routes/candidatRoutes");
const concoursRoutes = require("./routes/concoursRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors("*"));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/inscriptions", inscriptionRoutes);
app.use("/api/candidats", candidatRoutes);
app.use("/api/concours", concoursRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
