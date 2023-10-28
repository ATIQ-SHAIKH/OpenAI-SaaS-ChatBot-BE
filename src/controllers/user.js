"use strict";

const { compare } = require("bcrypt");
const MESSAGES = require("../constants/messages");
const RESPONSES = require("../constants/responseCodes");
const { userExists, createUser, findUser } = require("../manager/user");
const { jwtSign } = require("../middlewares/auth");
const logger = require("../logger")("controllers/users");

/**
 * Business login for signup
 * @param {Request} req
 * @param {Response} res
 * @returns Response
 */
const signup = async (req, res) => {
  logger.info(JSON.stringify(req.body));
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const emailExists = await userExists({ email });
    if (emailExists)
      return res
        .status(RESPONSES.CONFLICT)
        .json({ msg: MESSAGES.EMAIL_IN_USE });
    const user = await createUser({ name, email, password });
    if (!user || !user?.id)
      return res
        .status(RESPONSES.INTERNAL_SERVER_ERROR)
        .json(MESSAGES.SOME_ERROR);
    return res.json({ msg: MESSAGES.SIGNUP_SUCCESS });
  } catch (e) {
    logger.error(e);
    return res
      .status(RESPONSES.INTERNAL_SERVER_ERROR)
      .json({ msg: MESSAGES.SOME_ERROR });
  }
};

/**
 * Business logic for login
 * @param {Request} req
 * @param {Response} res
 * @returns Response
 */
const login = async (req, res) => {
  logger.info(JSON.stringify(req.body));
  try {
    const { email, password } = req.body;
    const user = await findUser({ email }, { password: 1 });
    if (!user || !user?.password || !compare(password, user.password))
      return res
        .status(RESPONSES.FORBIDDEN)
        .json({ msg: MESSAGES.INVALID_CREDETIALS });
    const token = await jwtSign({ id: user.id, name: user.name });
    return res.json({
      token,
    });
  } catch (e) {
    logger.error(e);
    return res
      .status(RESPONSES.INTERNAL_SERVER_ERROR)
      .json({ msg: MESSAGES.SOME_ERROR });
  }
};

module.exports = {
  signup,
  login,
};
