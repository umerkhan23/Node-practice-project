const mongoose = require("mongoose");

const apiLogSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    requestType: {
      type: String,
    },
    request: {
      type: Object,
    },
    response: {
      type: Object,
    },
    message: {
      type: String,
    },
    responseCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

module.exports = ApiLog;
