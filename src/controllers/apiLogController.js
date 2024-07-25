const ApiLog = require("../models/apiLogModel");
const { createApiLogSchema } = require("../validations/apiLogValidation");

const createLog = async (url, method, request) => {
  const validate = createApiLogSchema.validate({ url, method, request });
  if (validate.error) {
    throw new Error(validate.error.details[0].message);
  }
  const newLog = await ApiLog.create({
    url,
    requestType: method,
    request,
  });
  return newLog;
};

const updateResponse = async (logId, message, data, statusCode) => {
  const updatedLog = await ApiLog.findByIdAndUpdate(
    logId,
    { response: { message, data }, statusCode },
    { new: true }
  );
  return updatedLog;
};

module.exports = {
  createLog,
  updateResponse,
};
