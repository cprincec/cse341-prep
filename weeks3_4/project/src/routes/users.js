const usersRouter = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const controller = require("../controller/users");

usersRouter
  .route("/")
  .get(ensureAuth, controller.getUsers)
  .post(controller.createUser)

usersRouter.route("/:userId")
  .get(ensureAuth, controller.getUserById)
  .put(
    // checkSchema(validator.UpdateUserInfoSchema),
    // validator.validateSchema,
    ensureAuth,
    controller.updateUser)
  .delete(controller.deleteUser)

module.exports = usersRouter;
