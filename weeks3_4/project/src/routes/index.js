const router = require("express").Router();

router
  .use("/shops", require("./shops"))
  .use("/users", require("./users"))
  .use("/api-docs", require("./swagger"));

module.exports = router;
