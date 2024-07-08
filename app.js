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
    const PORT = process.env.PORT;
    app.listen(
      PORT,
      console.log(
        `MongoDb Connected Successfully and Server started on port ${PORT}`
      )
    );
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
