const rootRouter = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middlewares/auth");

rootRouter
  
  .use("/auth", require('./auth'))
  .use("/shops", require("./shops"))
  .use("/users", require("./users"))
  .use("/api-docs", require("./swagger"));

module.exports = rootRouter;
