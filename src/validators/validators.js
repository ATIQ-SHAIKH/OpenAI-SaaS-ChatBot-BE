"use strict";

const { check, body, query } = require("express-validator");
const MESSAGES = require("../constants/messages");
const { PASSWORD_REGEX } = require("../constants/constants");

const signupRules = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage(MESSAGES.NAME_VALIDATION_MESSAGE),
  body("email").isEmail().withMessage(MESSAGES.EMAIL_VALIDATION_MESSAGE),
  body("password")
    .isString()
    .matches(PASSWORD_REGEX)
    .withMessage(MESSAGES.PASSWORD_VALIDATION_MESSAGE),
];

const loginRules = [
  body("email").isEmail().withMessage(MESSAGES.EMAIL_VALIDATION_MESSAGE),
  body("password")
    .isString()
    .matches(PASSWORD_REGEX)
    .withMessage(MESSAGES.PASSWORD_VALIDATION_MESSAGE),
];

module.exports = { signupRules, loginRules };
