require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if (!process.env.JWT_PRIVATE_KEY) {
  console.log("FATAL ERROR: JWT_PRIVATE_KEY is not set");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/movieRental")
  .then(() => {
    console.log("DB CONNECTED...");
  })
  .catch((err) => {
    console.log("DB CONNECTION FAILED");
  });

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
