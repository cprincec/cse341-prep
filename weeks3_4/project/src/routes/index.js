const rootRouter = require("express").Router();

rootRouter
  .use("/shops", require("./shops"))
  .use("/users", require("./users"))
  .use("/api-docs", require("./swagger"));

module.exports = rootRouter;
