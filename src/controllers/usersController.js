const mongoose = require("mongoose");
const User = require("../models/usersModel");
const schedule = require("node-schedule");
const EncryptData = require("../utils/encrypt");
const DecryptData = require("../utils/decrypt");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("../validations/usersValidation");
const sendResponse = require("../utils/sendResponse");
const responseStatusCode = require("../constant/responseStatusCode");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    users.forEach((user) => {
      user.name = DecryptData(user.name);
      user.email = DecryptData(user.email);
      user.password = DecryptData(user.password);
    });

    await sendResponse(
      res,
      responseStatusCode.OK,
      "Data retrieved successfully",
      users,
      req.logId
    );

    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("Data retrieved successfully");
    });
  } catch (error) {
    if (!res.headersSent) {
      await sendResponse(
        res,
        responseStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        null,
        req.logId
      );
    }
    return;
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return await sendResponse(
        res,
        responseStatusCode.BAD_REQUEST,
        "Invalid user ID",
        null,
        req.logId
      );
    }

    const { error } = getUserSchema.validate(req.params);
    if (error) {
      return await sendResponse(
        res,
        responseStatusCode.BAD_REQUEST,
        error.details[0].message,
        null,
        req.logId
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return await sendResponse(
        res,
        responseStatusCode.NOT_FOUND,
        "No user with that ID",
        null,
        req.logId
      );
    }

    user.name = DecryptData(user.name);
    user.email = DecryptData(user.email);
    user.password = DecryptData(user.password);

    await sendResponse(
      res,
      responseStatusCode.OK,
      "User retrieved successfully",
      user,
      req.logId
    );

    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("User with ID: " + id + " retrieved successfully");
    });
  } catch (error) {
    await sendResponse(
      res,
      responseStatusCode.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null,
      req.logId
    );
    return;
  }
};

const createUser = async (req, res) => {
  const validate = createUserSchema.validate(req.body);
  if (validate.error) {
    return await sendResponse(
      res,
      responseStatusCode.BAD_REQUEST,
      validate.error.details[0].message,
      null,
      req.logId
    );
  }
  const user = req.body;
  const encryptedName = EncryptData(user.name);
  const encryptedEmail = EncryptData(user.email);
  const encryptedPassword = EncryptData(user.password);
  const data = {
    name: encryptedName,
    email: encryptedEmail,
    password: encryptedPassword,
  };
  const newUser = new User(data);
  try {
    await newUser.save();
    await sendResponse(
      res,
      responseStatusCode.CREATED,
      "User created successfully",
      newUser,
      req.logId
    );
    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log(req.body.name + " created successfully");
    });
  } catch (error) {
    await sendResponse(
      res,
      responseStatusCode.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null,
      req.logId
    );
    return;
  }
};

const updateUser = async (req, res) => {
  const validate = updateUserSchema.validate(req.body);
  if (validate.error) {
    return await sendResponse(
      res,
      responseStatusCode.BAD_REQUEST,
      validate.error.details[0].message,
      null,
      req.logId
    );
  }
  const { id: _id } = req.params;
  const user = req.body;
  const encryptedName = EncryptData(user.name);
  const encryptedEmail = EncryptData(user.email);
  const encryptedPassword = EncryptData(user.password);
  const data = {
    name: encryptedName,
    email: encryptedEmail,
    password: encryptedPassword,
  };

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...data, _id },
    { new: true }
  );
  res.json(updatedUser);
  const date = new Date();
  const date2 = new Date(date.getTime() + 5000);
  schedule.scheduleJob(date2, function () {
    console.log("User with id: " + req.params.id + " updated successfully");
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!_id) {
      return await sendResponse(
        res,
        responseStatusCode.BAD_REQUEST,
        "Invalid user ID",
        null,
        req.logId
      );
    }

    const response = await User.findById(_id);

    if (!response) {
      return await sendResponse(
        res,
        responseStatusCode.NOT_FOUND,
        "No user with that ID",
        null,
        req.logId
      );
    }

    await User.deleteOne({ _id });

    res.json({ message: "User deleted successfully" });

    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("User with ID: " + _id + " deleted successfully");
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    await sendResponse(
      res,
      responseStatusCode.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null,
      req.logId
    );
    return;
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
