const Shop = require("../model/Shop");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

async function getShops(req, res, next) {
  try {
    let shops = await Shop.find({});
    if (!shops) {
      throw createError(400, "No shop found in database");
    }
    res.status(200).json(shops);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  let id = new ObjectId(req.params.shopId);
  let shop = await Shop.findOne({ _id: id });
  console.log(shop);
  let products = await fetch(`${shop.url}/products`)
    .then((product) => product.json())
    .catch((err) => console.log(err, err.message));

  res.setHeader("Content-Type", "application/json");
  if (shop.name == "Storest") {
    res.status(200).send(products.data);
  } else {
    res.status(200).send(products);
  }
}

async function getCategories(req, res) {
  let id = new ObjectId(req.params.shopId);
  let shop = await Shop.findOne({ _id: id });
  let categories;
  if (shop.name == "Fake Store") {
    categories = await fetch(`${shop.url}/products/categories`).then(
      (category) => category.json()
    );
  } else {
    categories = await fetch(`${shop.url}/categories`).then((category) =>
      category.json()
    );
  }
  res.setHeader("Content-Type", "application/json");
  if (shop.name == "Storest") {
    res.status(200).send(categories.data);
  } else {
    res.status(200).send(categories);
  }
}

async function getProduct(req, res, next) {
  let id = new ObjectId(req.params.shopId);
  let shop = await Shop.findOne({ _id: id });

  let product;

  try {
    // Get all products
    let products = await fetch(`${shop.url}/products`).then((product) =>
      product.json()
    );

    // filter single product
    if (shop.name == "Storest") {
      // find the product name of product matching id in request parameter
      product = products.data.find((item) => item._id == req.params.productId);
    } else {
      product = products.find((item) => item.id == req.params.productId);
    }
    if (!product) {
      throw createError(400, "Product does not exist in database.");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

module.exports = { getShops, getProducts, getCategories, getProduct };
