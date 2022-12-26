const { Router } = require("express");
const controller = require("../controllers/user");
const router = Router();

router.get("/", controller.usersGet);
router.post("/", controller.usersPost);
router.put("/:id", controller.usersPut);
router.delete("/", controller.usersDelete);

module.exports = router;
