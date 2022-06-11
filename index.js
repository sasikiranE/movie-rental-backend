const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const app = express();

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
