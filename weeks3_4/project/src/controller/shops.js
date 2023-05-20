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
  console.log(
    `Here are the shops ${result}. Here the data type ${typeof result}`
  );
}

async function getProducts(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.id);
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
    let products = await fetch(`${shop.url}/products`).then((product) =>
      product.json()
    );
  // }

  if (shop.name == "Storest") {
    res.status(200).send(products.data);
  } else {
    res.status(200).send(products);
  }
}

async function getCategories(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.id);
  let shop = await col.findOne({ _id: id }, { projection: { url: 1 } });
  let categories = await fetch(`${shop.url}/categories`).then((category) =>
    category.json()
  );
  res.status(200).send(categories);
}

async function getProduct(req, res) {
  let col = returnCollection();
  let id = new ObjectId(req.params.id);
  let shop = await col.findOne({ _id: id });
  let product;
  console.log(shop.name);
  if (shop.name == "Storest") {
    // Get all products
    let products = await fetch(`${shop.url}/products`).then((product) =>
      product.json()
    );

    // find the product name of product matching id in request parameter
    let item = products.data.find(
      (product) => product._id == req.params.productId
    );
    let productName = item.title.replace(/ /g, "-");
    console.log(productName);

    // retrieve all information for that product
    product = await fetch(`${shop.url}/products/${productName}`).then(
      (product) => product.json()
    );
  } else {
    product = await fetch(`${shop.url}/products/${req.params.productId}`).then(
      (product) => product.json()
    );
  }
  res.status(200).send(product);
}

function returnCollection(dbname = "ecommerce", collection = "shops") {
  return connection.getDb().db(dbname).collection(collection);
}

module.exports = { getShops, getProducts, getCategories, getProduct };
