"use strict";
const rateLimit = require("express-rate-limit");
const {
  RATE_LIMITER_MAX_TRY,
  RATE_LIMITER_WINDOW,
} = require("../constants/constants");

const { TOO_MANY_REQUESTS } = require("../constants/messages");

const limiter = rateLimit({
  windowMs: RATE_LIMITER_WINDOW,
  max: RATE_LIMITER_MAX_TRY,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: TOO_MANY_REQUESTS
});

module.exports = limiter;
