"use strict";

const UserModel = require("../models/user");

const findUser = (conditions = {}, projects = {}) => {
  return UserModel.findOne(conditions, projects);
};

const userExists = (conditions = {}) => {
  if (Object.keys(conditions).length === 0) {
    return false;
  }
  return UserModel.exists(conditions);
};

const findUsers = (
  conditions = {},
  projects = "",
  sorts = {},
  populate = [],
  options = { page: 1, limit: 10 }
) => {
  options.sort = sorts;
  options.populate = populate;
  options.select = projects;
  return UserModel.paginate(conditions, options);
};

const updateUser = (conditions = {}, value) => {
  return UserModel.updateOne(conditions, { $set: value });
};

const createUser = (userObj) => {
  const user = new UserModel(userObj);
  return user.save();
};

const deleteUser = (condition) => {
  return UserModel.deleteOne(condition);
};

module.exports = {
  findUser,
  findUsers,
  updateUser,
  createUser,
  userExists,
  deleteUser,
};
