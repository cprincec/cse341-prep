const connection = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
// async function getProducts(req, res) {
//     let collection = returnCollection();

// }

async function getShops(req, res) {
  let col = returnCollection();
  console.log(col);
  let result = await col.find();
  result.toArray().then((resultList) => {
    res.status(200).json(resultList);
  });
}

async function getProducts(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.shopId);
  let shop = await col.findOne({ _id: id });
  // let products;
  // console.log(req.query.title);

  // if (req.query.title) {
  //   console.log("Searching by title")

  //   let productTitle = req.query.title;
  //   console.log(`${shop.url}/products/?title="${productTitle}"`);
  //   products = await fetch(`${shop.url}/products/?title="${productTitle}"`).then(
  //     (product) => product.json()
  //   );
  // } else {

  let products = await fetch(`${shop.url}/products`)
    .then((product) => product.json())
    .catch((err) => console.log(err, err.message));

  // }
  res.setHeader("Content-Type", "application/json");
  if (shop.name == "Storest") {
    res.status(200).send(products.data);
  } else {
    res.status(200).send(products);
  }
}

async function getCategories(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.shopId);
  let shop = await col.findOne({ _id: id });
  console.log(`${shop.url}/categories`);
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

  console.log(categories);

  if (shop.name == "Storest") {
    res.status(200).send(categories.data);
  } else {
    res.status(200).send(categories);
  }
}

async function getProduct(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.shopId);
  let shop = await col.findOne({ _id: id });
  let product;

  if (shop.name == "Storest") {
    // Get all products
    let products = await fetch(`${shop.url}/products`).then((product) =>
      product.json()
    );

    // find the product name of product matching id in request parameter
    let item = products.data.find(
      (product) => product._id == req.params.productId
    );
    // Replace spaces between words with an hyphen
    let productName = item.title.replace(/ /g, "-");

    // retrieve all information for that product
    product = await fetch(`${shop.url}/products/${productName}`).then(
      (product) => product.json()
    );
  } else {
    product = await fetch(`${shop.url}/products/${req.params.productId}`).then(
      (product) => product.json()
    );
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(product);
}

function returnCollection(dbname = "ecommerce", collection = "shops") {
  return connection.getDb().db(dbname).collection(collection);
}

module.exports = { getShops, getProducts, getCategories, getProduct };
