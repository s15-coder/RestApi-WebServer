const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const {  UNAUTHORIZED } = require("../errors/code-errors");
const User = require("../models/user");

const validateJwt = async (req = request, res = response, next) => {
  const authorization = req.header("authorization");
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ msg: "Authorization must be provided" });
  }
  try {
    const {uid} = jwt.verify(authorization, process.env.JWT_SEED);
    const user = await User.findById(uid);
    if(!user){
      return res.status(UNAUTHORIZED).json({'msg':'Invalid Authorization - Not exists'})
    }
    if(!user.active){
      return res.status(UNAUTHORIZED).json({'msg':'Invalid Authorization - Not active'})
    }
    req.authenticatedUser = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(UNAUTHORIZED).json({ msg: "Invalid Authorization" });
  }
};

module.exports = { validateJwt };
