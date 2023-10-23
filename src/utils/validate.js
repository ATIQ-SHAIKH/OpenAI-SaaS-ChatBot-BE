"use strict";

const { validationResult } = require("express-validator");
const RESPONSES = require("../constants/responseCodes");
const logger = require("../logger")("/utils/validate");

const validate = (validationRules) => {
  return async (request, result, next) => {
    const error = {};
    await Promise.all(
      validationRules.map((validation) => validation.run(request))
    );

    const errors = validationResult(request);

    if (errors.isEmpty()) {
      return next();
    }

    error.errors = errors.array();
    logger.error(JSON.stringify(error));
    return result.status(RESPONSES.BAD_REQUEST).json({ error });
  };
};

module.exports = validate;
