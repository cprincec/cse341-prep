const router = require("express").Router();
const controller = require("../controller/shops");

router.route("/").get(controller.getShops);

router.route("/:id/products").get(controller.getProducts);

router.route("/:id/categories").get(controller.getCategories);

router.route("/:id/products/:productId").get(controller.getProduct);

module.exports = router;
