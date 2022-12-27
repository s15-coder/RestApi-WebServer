const { response } = require("express");
const { SERVER_ERROR_CODE, UNAUTHORIZED } = require("../errors/code-errors");

const isAdminRole = (req, res = response, next) => {
  if (!req.authenticatedUser) {
    return res.status(SERVER_ERROR_CODE).json({
      msg: "Trying to validate a role without pre-validation of JWT.",
    });
  }

  if (req.authenticatedUser.role !== "ADMIN_ROLE") {
    return res.status(UNAUTHORIZED).json({
      msg: "You must be ADMIN to perform this request successfully.",
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.authenticatedUser) {
      return res.status(SERVER_ERROR_CODE).json({
        msg: "Trying to validate a role without pre-validation of JWT.",
      });
    }
    if (!roles.includes(req.authenticatedUser.role)) {
      return res.status(UNAUTHORIZED).json({
        msg: "Invalid role to perform request",
        allowedRoles: roles,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
