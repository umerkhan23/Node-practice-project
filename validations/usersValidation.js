const joi = require("joi");

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const updateUserSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
});

const getUserSchema = joi.object({
  id: joi.string().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
