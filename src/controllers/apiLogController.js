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
  return newLog.save();
};

module.exports = {
  createLog,
};
