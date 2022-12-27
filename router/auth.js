const { Router } = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/login",
  [
    body("password", "Password is required ").not().isEmpty(),
    body("email", "Email is not valid").isEmail(),
    validateFields,
  ],
  login
);

module.exports = router;
