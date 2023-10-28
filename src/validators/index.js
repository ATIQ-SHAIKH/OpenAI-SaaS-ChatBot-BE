"use strict";
const validate = require("../utils/validate");

const { signupRules, loginRules } = require("./validators");

module.exports = {
  loginValidation: validate(loginRules),
  signupValidation: validate(signupRules),
};
