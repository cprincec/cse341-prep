const shopsRouter = require("express").Router();
const controller = require("../controller/shops");

shopsRouter.route("/").get(controller.getShops);

shopsRouter.route("/:shopId/products").get(controller.getProducts);

shopsRouter.route("/:shopId/categories").get(controller.getCategories);

shopsRouter.route("/:shopId/products/:productId").get(controller.getProduct);

module.exports = shopsRouter;

