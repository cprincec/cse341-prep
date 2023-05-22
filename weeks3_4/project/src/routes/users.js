const router = require("express").Router();
const controller = require("../controller/users");

router.route("/").get(controller.getUsers).post(controller.createUser);

router.route("/:userId").get(controller.getUserById);

module.exports = router;
