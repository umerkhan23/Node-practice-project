const { updateResponse } = require("../controllers/apiLogController");

const sendResponse = async (res, statusCode, message, data, logId) => {
  try {
    if (data) {
      await updateResponse(logId, message, data, statusCode);
    }

    if (!res.headersSent) {
      res.status(statusCode).json({ message, data });
    } else {
      console.warn("Headers already sent.");
    }
  } catch (error) {
    console.error("Error in sendResponse:", error);
    if (!res.headersSent) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      console.warn("Error occurred after headers were sent.");
    }
  }
};

module.exports = sendResponse;
