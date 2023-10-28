"use strict";

const express = require("express");
const router = express.Router();
const user = require("./user");
const ROUTES = require("../constants/routes");
const { jwtAuth } = require("../middlewares/auth");
const limiter = require("../middlewares/rateLimiter");

router.use(ROUTES.USER_ROUTES.ROOT, limiter, user.public);

router.use(jwtAuth);
router.use(ROUTES.USER_ROUTES.ROOT, user.private);

module.exports = router;
