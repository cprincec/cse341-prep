const createError = require("http-errors");
const User = require("../model/User");
const ObjectId = require("mongodb").ObjectId;

async function createUser(req, res, next) {
  try {
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
  console.log(req.user)
  try {
    id = new ObjectId(req.params.userId);
  } catch (error) {
    error.message = "Invalid user id";
    error.status = 500;
    next(error);
  }

  // Check that the authenticated user is the person
  // trying to access this
  let loggedInUserId = req.user[0]._id.toString();
  if (loggedInUserId != id) {
    console.log("redirecting")
    res.redirect("http://localhost:8000/auth/logout")
    return;
  }

  try {
    console.log("inside the next try")
    let user = await User.findOne({ _id: id });
    if (!user) {
      throw createError(400, "User does not exist");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Caught and error: ", error.message)
    next(error);
  }
}

async function updateUser(req, res, next) {
  // try {
  //   let col = returnCollection("ecommerce", "users");
  //   let userId = new ObjectId(req.params.userId);
  //   let user = {
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password,
  //     phoneNumber: req.body.phoneNumber,
  //   };
  //   let result = await col.replaceOne({ _id: userId }, user);
  //   if (result.acknowledged) {
  //     res.status(201).json(result.insertedId);
  //   } else {
  //     res
  //       .status(500)
  //       .json(
  //         result.error || "Some error occurred while updating user information"
  //       );
  //   }
  // } catch (error) {
  //   next(error);
  // }
}

async function deleteUser(req, res, next) {
  // let userId = new ObjectId(req.params.userId);
  // try {
  //   let col = returnCollection("ecommerce", "users");
  //   let result = await col.deleteOne({ _id: userId });
  //   if (!result.deletedCount) {
  //     throw createError(400, "User not found");
  //   }
  //   if (result.deletedCount) {
  //     res.status(200).send();
  //   } else {
  //     res
  //       .status(500)
  //       .json(result.error || "Some error occurred while deleting the user.");
  //   }
  // } catch (error) {
  //   next(error);
  // }
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
