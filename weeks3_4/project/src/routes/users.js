const usersRouter = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const controller = require("../controller/users");

const authMiddleware = require("../middlewares/authenticate");
usersRouter.post("/login", controller.loginUser);
usersRouter
  .route("/")
  .get(authMiddleware.authenticate, controller.getUsers)
  .post(controller.createUser);

usersRouter
  .route("/:userId")
  .get(authMiddleware.authenticate, controller.getUserById)
  .put(authMiddleware.authenticate, controller.updateUser)
  .delete(authMiddleware.authenticate, controller.deleteUser);

module.exports = usersRouter;
