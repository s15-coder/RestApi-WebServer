const { validationResult } = require("express-validator");
const { BAD_REQUEST_CODE } = require("../errors/code-errors");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_CODE).json(errors);
  }
  next();
};
const validatePagination = (req, res, next) => {
  let { limit, page } = req.query;
  if (isNaN(limit)) {
    req.query.limit = 5;
  }
  if (isNaN(page)) {
    req.query.page = 0;
  }
  next()
};

module.exports = {
  validateFields,
  validatePagination,
};
