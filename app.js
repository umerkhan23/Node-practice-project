const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const UserRoutes = require("./routes/userRoutes");
const apiLogMiddleware = require("./middlewares/apiLoggerMiddleware");
require("./configs/db");

app.use(express.json());
app.use(cors());
app.use(apiLogMiddleware);
app.use("/api/users", UserRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
