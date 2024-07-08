const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/users", UserRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
