const rootRouter = require("express").Router();

rootRouter
  .use("/auth", require("./auth"))
  .use("/shops", require("./shops"))
  .use("/users", require("./users"))
  // .use("/cart", require("./cart"))
  .use("/api-docs", require("./swagger"));

module.exports = rootRouter;
