const { Schema, model } = require("mongoose");
const { ROLES } = require("../constants/roles");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
      required: true,
  },
});
UserSchema.methods.toJSON = function(){
  const {__v, password,_id, ...user} = this.toObject()
  user.uid = _id;
  return user;
}
const User = model("User", UserSchema);
module.exports = User;
