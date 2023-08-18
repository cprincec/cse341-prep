const usersRouter = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const controller = require("../controller/users");

usersRouter
  .route("/")
  .get(ensureAuth, (req, res) => {
    console.log(req.session);
    controller.getUsers;
  })
  .post(controller.createUser);

usersRouter
  .route("/:userId")
  .get(ensureAuth, controller.getUserById)
  .put(ensureAuth, controller.updateUser)
  .delete(ensureAuth, controller.deleteUser);


module.exports = usersRouter;
