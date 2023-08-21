const createError = require("http-errors");
const User = require("../model/User");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).send("incorrect email or password");
  }

  const match = bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(401).send("incorrect password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
  res.status(200).json({ user, token });
}

async function createUser(req, res, next) {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw createError(400, "User already exists");
    }

    let user = {
      oAuth: req.body.oAuth,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    };

    let newUser = new User(user);
    let result = await newUser.save();
    if (!result) {
      throw createError(500, "Error creating user");
    }
    res.status(201).json(result._id);
  } catch (err) {
    let errorDescs = [];
    if (err._message == "User validation failed") {
      for (let key in err.errors) {
        errorDescs.push(err.errors[key].properties.message);
        err.status = 400;
        err.message = errorDescs;
      }
      next(err);
    } else {
      next(err);
    }
  }
}

async function getUsers(req, res) {
  try {
    let user = await User.find({});
    if (!user) {
      throw createError(400, "No user found in database");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  console.log(req.user);
  let id;
  try {
    id = new ObjectId(req.params.userId);
  } catch (error) {
    error.message = "Invalid user id";
    error.status = 500;
    return next(error);
  }
  // Check that the authenticated user is the person
  // trying to access this
  let authorizedUserId = req.user.userId;
  if (authorizedUserId != id) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      throw createError(401, "Incorrect Email or password");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const userId = new ObjectId(req.params.userId);
  let authorizedUserId = req.user.userId;
  if (authorizedUserId != userId) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    let userfound = await User.findOne({ _id: userId });
    if (!userfound) {
      return res.status(404).json({ message: "User not found" });
    }

    userfound.firstName = req.body.firstName;
    userfound.lastName = req.body.lastName;
    userfound.email = req.body.email;
    userfound.password = req.body.password;
    userfound.phoneNumber = req.body.phoneNumber;

    let result = await userfound.save();
    if (result) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: "There was a problem creating user. Try again" });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  let authorizedUserId = req.user.userId;
  if (authorizedUserId != id) {
    res.status(401).send("unauthorized");
    return;
  }
  let userId = new ObjectId(req.params.userId);
  try {
    let result = await User.findByIdAndRemove({ _id: userId });
    console.log(result);
    if (!result) {
      throw createError(400, "User not found");
    }
    res.status(200).json("Account deleted");
  } catch (error) {
    next(error);
  }
}

// function returnCollection(dbname = "ecommerce", collection = "shops") {
//   return connection.getDb().db(dbname).collection(collection);
// }

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
