const createError = require("http-errors");
const User = require("../model/User");
const ObjectId = require("mongodb").ObjectId;

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
  let id;
  console.log("in", req.params.userId);
  try {
    id = new ObjectId(req.params.userId);
  } catch (error) {
    error.message = "Invalid user id";
    error.status = 500;
    console.log(error);
    return next(error);
  }

  // Check that the authenticated user is the person
  // trying to access this
  let loggedInUserId = req.user._id.toString();
  if (loggedInUserId != id) {
    res.redirect("http://localhost:8000/auth/logout");
    return;
  }

  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      throw createError(400, "User does not exist");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const userId = new ObjectId(req.params.userId);

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
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
