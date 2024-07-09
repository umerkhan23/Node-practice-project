const asyncHandler = require("express-async-handler");
const { createLog } = require("../controllers/apiLogController");

const apiLogMiddleware = asyncHandler(async (req, res, next) => {
  if (req.url.startsWith(`/api/users`)) {
    next();
  }
  const { method, body, query, params, url } = req;
  const request = { body, query, params };
  const newLog = await createLog(url, method, request);
  req.logId = newLog._id;
  next();
});
module.exports = apiLogMiddleware;
