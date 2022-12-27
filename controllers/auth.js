const { response } = require("express");
const bcrypt = require("bcrypt");
const { BAD_REQUEST_CODE } = require("../errors/code-errors");
const User = require("../models/user");
const { generateJwt } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { password, email } = req.body;
  //Validate if email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(BAD_REQUEST_CODE).json({
      msg: "Invalid credentials - email",
    });
  }

  //Validate if user is active
  if (!user.active) {
    return res.status(BAD_REQUEST_CODE).json({
      msg: "Invalid credentials - not active",
    });
  }

  //Validate if password matches
  const passwordMatches = bcrypt.compareSync(password, user.password);
  if (!passwordMatches) {
    return res.status(BAD_REQUEST_CODE).json({
      msg: "Invalid credentials - password",
    });
  }

  //Generate JWT with the UID   
  const token =await generateJwt({ uid: user._id });
  res.json({
    user,
    token,
  });
};

module.exports = {
  login,
};
