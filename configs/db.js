const { log, logLevels } = require("../utils/logger");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    log(logLevels.INFO, "MongoDb Connected Successfully");
  })
  .catch((error) => {
    log(logLevels.ERROR, `Error: ${error.message}`);
  });
