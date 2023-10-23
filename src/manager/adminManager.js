"use strict";

const adminRegistration = require("../models/adminModel");

const findAdmin = (conditions = {}, projects = {}) => {
  return adminRegistration.findOne(conditions, projects);
};

const adminExists = (conditions = {}) => {
  if (Object.keys(conditions).length === 0) {
    return false;
  }
  return adminRegistration.exists(conditions);
};

const findAdmins = (
  conditions = {},
  projects = "",
  sorts = {},
  populate = [],
  options = { page: 1, limit: 10 }
) => {
  options.sort = sorts;
  options.populate = populate;
  options.select = projects;
  return adminRegistration.paginate(conditions, options);
};

const updateAdmin = (conditions = {}, value) => {
  return adminRegistration.updateOne(conditions, { $set: value });
};

const createAdmin = (adminObj) => {
  const user = new adminRegistration(adminObj);
  return user.save();
};

const deleteAdmin = (condition) => {
  return adminRegistration.deleteOne(condition);
};

module.exports = {
  findAdmin,
  findAdmins,
  updateAdmin,
  createAdmin,
  adminExists,
  deleteAdmin,
};
