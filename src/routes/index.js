"use strict";

const express = require("express");
const router = express.Router();
const admin = require("./admin");
const ROUTES = require("../constants/routes");
const { jwtAuth } = require("../middlewares/auth");
const limiter = require("../middlewares/rateLimiter");

router.use(ROUTES.ADMIN_ROUTES.ROOT, limiter, admin.public);

router.use(jwtAuth);
router.use(ROUTES.ADMIN_ROUTES.ROOT, admin.private);

module.exports = router;
