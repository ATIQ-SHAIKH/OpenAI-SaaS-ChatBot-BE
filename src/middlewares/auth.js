"use strict";
const jwt = require("jsonwebtoken");
const MESSAGES = require("../constants/messages");
const RESPONSES = require("../constants/responseCodes");
const { JWT_TOKEN_KEY } = require("config");
const logger = require("../logger")("/middlewares/auth");

const jwtAuth = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(RESPONSES.FORBIDDEN)
      .json({ msg: MESSAGES.INVALID_CREDENTIAL });
  }
  const token = req.headers["authorization"].split(" ")[1] || "";
  if (!token) {
    return res
      .status(RESPONSES.FORBIDDEN)
      .json({ msg: MESSAGES.INVALID_CREDENTIAL });
  }
  try {
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);
    if (!decoded) throw MESSAGES.INVALID_USER;
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(err);
    res.status(RESPONSES.UNAUTHORIZED).json({ msg: MESSAGES.INVALID_USER });
  }
};

const jwtSign = (obj) => jwt.sign(obj, JWT_TOKEN_KEY);

module.exports = { jwtAuth, jwtSign };
