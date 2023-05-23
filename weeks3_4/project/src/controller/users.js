const ObjectId = require("mongodb").ObjectId;
const connection = require("../db/connect");
const createError = require("http-errors");

async function createUser(req, res) {
  let user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  };
  let col = returnCollection("ecommerce", "users");

  let result = await col.insertOne(user);
  if (result.acknowledged) {
    res.status(201).json(result.insertedId);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating user.");
  }
}

async function getUsers(req, res) {
  let col = returnCollection("ecommerce", "users");
  await col
    .find({})
    .toArray()
    .then((usersList) => res.status(200).json(usersList));
}

async function getUserById(req, res, next) {
  let col = returnCollection("ecommerce", "users");
  let userId = new ObjectId(req.params.userId);
  try {
    let user = await col.findOne({ _id: userId });
    if (!user) {
      throw createError(404, "User does not exist.");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    let col = returnCollection("ecommerce", "users");
    let userId = new ObjectId(req.params.userId);
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    };
    let result = await col.replaceOne({ _id: userId }, user);
    if (result.acknowledged) {
      res.status(201).json(result.insertedId);
    } else {
      res
        .status(500)
        .json(
          result.error || "Some error occurred while updating user information"
        );
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  let userId = new ObjectId(req.params.userId);
  try {
    let col = returnCollection("ecommerce", "users");
    let result = await col.deleteOne({ _id: userId });
    console.log(result)
    if (!result) {
      throw new Error("404", "Invalid user id");
    }
    if (result.deletedCount) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(result.error || "Some error occurred while deleting the user.");
    }
  } catch (error) {
    next(error);
  }
}

function returnCollection(dbname = "ecommerce", collection = "shops") {
  return connection.getDb().db(dbname).collection(collection);
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  returnCollection,
  updateUser,
  deleteUser,
};
