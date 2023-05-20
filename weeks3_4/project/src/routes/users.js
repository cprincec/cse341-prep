const router = require("express").Router();
const controller = require("../controller/users");

router.route("/")
    // .get(controller.getShops)
    .post(controller.createUser)


module.exports = router;