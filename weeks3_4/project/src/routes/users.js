const usersRouter = require("express").Router();
const { checkSchema } = require("express-validator");
const validator = require("../services/validator");
const controller = require("../controller/users");

usersRouter
  .route("/")
  .get(controller.getUsers)
  .post(
    checkSchema(validator.SignupSchema),
    validator.validateSchema,
    controller.createUser
  )

usersRouter.route("/:userId")
  .get(controller.getUserById)
  .put(
    checkSchema(validator.UpdateUserInfoSchema),
    validator.validateSchema,
    controller.updateUser)
  .delete(controller.deleteUser)

module.exports = usersRouter;
