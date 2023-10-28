"use strict";

const router = require("express").Router();
const { login, signup } = require("../../controllers/user");
const { loginValidation, signupValidation } = require("../../validators");
const { USER_ROUTES } = require("../../constants/routes");

router.post(USER_ROUTES.LOGIN, loginValidation, login);

router.post(USER_ROUTES.SIGNUP, signupValidation, signup);

module.exports = router;
