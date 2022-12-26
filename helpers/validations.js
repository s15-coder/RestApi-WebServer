const Role = require("../models/role");
const User = require("../models/user");

const _uniqueEmailErrorCode = 11000;
const isUniqueEmailError = (error) => {
  if (error["code"] === _uniqueEmailErrorCode) {
    return {
      error: "Email is already in use",
      code: _uniqueEmailErrorCode,
    };
  }
  return false;
};
const isValidRole = async (role, isRequired = true) => {
  if(!isRequired){
    if(role === undefined || role == null ){
      return
    }
  }
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} does not exists`);
  }
};

const existsUserInDB = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`The user with id '${id}' does not exists`);
  }
};

const ifNameExistsIsNotEmpty = async(name ) => {
    if (name === '') {
      throw new Error(`The name cannot be empty.`);
    }
};

module.exports = {
  isValidRole,
  isUniqueEmailError,
  existsUserInDB,
  ifNameExistsIsNotEmpty,
};
