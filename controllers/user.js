const { response, request } = require("express");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const { isUniqueEmailError } = require("../helpers/validations");
const { encryptPassword } = require("../helpers/password");
const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
} = require("../errors/code-errors");

const usersGet = async (req = request, res = response) => {
  const { limit, page } = req.query;
  const query = { active: true };
  const [users, count] = await Promise.all([
    User.find(query).skip(Number(page)).limit(Number(limit)),
    User.count(query),
  ]);
  res.json({ count, limit, page, users });
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, email, ...remaining } = req.body;
  const userUpdated = await User.findByIdAndUpdate(id, remaining, {
    new: true,
  });
  res.json({ user: userUpdated });
};

const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const userRemoved = await User.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  );
  res.json({
    userRemoved,
  });
};

const usersPost = async (req = request, res = response) => {
  try {
    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });

    user.password = encryptPassword(password);

    await user.save();

    return res.json({
      user,
    });
  } catch (error) {
    const uniqueEmailError = isUniqueEmailError(error);
    if (uniqueEmailError) {
      return res.status(BAD_REQUEST_CODE).json(uniqueEmailError);
    }
    return res.status(SERVER_ERROR_CODE).json({ error });
  }
};

module.exports = {
  usersGet,
  usersDelete,
  usersPost,
  usersPut,
};
