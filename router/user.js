const { Router } = require("express");
const { body, param } = require("express-validator");

const controller = require("../controllers/user");
const {
  isValidRole,
  existsUserInDB,
  ifNameExistsIsNotEmpty,
} = require("../helpers/validations");
const {
  validateFields,
  validatePagination,
  validateJwt,
  isAdminRole,
  hasRole,
} = require("../middlewares");

const router = Router();

router.get("/", [validatePagination], controller.usersGet);

router.post(
  "/",
  [
    body("email", "email is not valid").isEmail(),
    body("name", "name is required").not().isEmpty(),
    body(
      "password",
      "password must have a length of at least of 7 characters"
    ).isLength({ min: 6 }),
    body("role").custom(isValidRole),
    validateFields,
  ],
  controller.usersPost
);

router.put(
  "/:id",
  [
    param("id", "Is not a valid MongoId").isMongoId(),
    param("id").custom(existsUserInDB),
    body("name").custom(ifNameExistsIsNotEmpty),
    body("role").custom((role) => isValidRole(role, false)),
    validateFields,
  ],
  controller.usersPut
);
router.delete(
  "/:id",
  [
    validateJwt,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    param("id", "Is not a valid MongoId").isMongoId(),
    param("id").custom(existsUserInDB),
    validateFields,
  ],
  controller.usersDelete
);

module.exports = router;
