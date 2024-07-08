const mongoose = require("mongoose");
const User = require("../models/usersModel");
const schedule = require("node-schedule");
const EncryptData = require("../utils/encrypt");
const DecryptData = require("../utils/decrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      user.name = DecryptData(user.name);
      user.email = DecryptData(user.email);
      user.password = DecryptData(user.password);
    });
    res.status(200).json(users);
    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("Data get successfully");
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = DecryptData(user.name);
    user.email = DecryptData(user.email);
    user.password = DecryptData(user.password);
    res.status(200).json(user);
    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("User with id: " + req.params.id + " get successfully");
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
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
    res.status(201).json(newUser);
    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log(req.body.name + " created successfully");
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
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
  const { id: _id } = req.params;
  const response = await User.findById(_id);
  if (!response) return res.status(404).send("No user with that id");
  if (response) {
    await User.deleteOne({ _id });
    const date = new Date();
    const date2 = new Date(date.getTime() + 5000);
    schedule.scheduleJob(date2, function () {
      console.log("User with id: " + req.params.id + " deleted successfully");
    });
  }
  res.json({ message: "User deleted successfully" });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
