const express = require("express");
const app = express();
const mongoose = require("mongoose");
const appointments = require("./routes/Appointments");
const patients = require("./routes/patients");
const login = require("./routes/login");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost/clinic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.log("Could not connect to the database", err));

app.use(express.json());

app.use("/api/appointments", appointments);

app.use("/api/patients", patients);

app.use("/api/login", login);

const port = process.env.PORT || 3000;

app.listen(port);
