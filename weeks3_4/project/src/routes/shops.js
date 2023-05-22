const router = require("express").Router();
const controller = require("../controller/shops");

router.route("/").get(controller.getShops);

router.route("/:shopId/products").get(controller.getProducts);

router.route("/:shopId/categories").get(controller.getCategories);

router.route("/:id/products/:productId").get(controller.getProduct);

module.exports = router;

