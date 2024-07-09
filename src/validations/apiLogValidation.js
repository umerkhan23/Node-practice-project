const joi = require("joi");

const createApiLogSchema = joi.object({
  url: joi.string().required(),
  method: joi.string().required(),
  request: joi.object().required(),
});

module.exports = {
  createApiLogSchema,
};
