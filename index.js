const express = require("express");
const app = express();
const mongoose = require("mongoose");
const appointments = require("./routes/Appointments");
const patients = require("./routes/patients");
const login = require("./routes/login");
const config = require("config");
require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not define.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/clinic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.log("Could not connect to the database", err));

app.use(express.json());

app.use("/api/appointments", appointments);

app.use("/api/patients", patients);

app.use("/api/login", login);

const port = process.env.PORT || 3000;

app.listen(port);
