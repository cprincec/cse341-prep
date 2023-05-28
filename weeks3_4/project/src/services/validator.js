// const mongoose = require('mongoose');
// const { checkSchema, validationResult } = require("express-validator");
// const users = require("../controller/users");
// const { ObjectId } = require("mongodb");
// const createError = require('http-errors');

// const SignupSchema = {
//   firstName: {
//     trim: true,
//     notEmpty: true,
//     errorMessage: "Firstname is required!",
//   },
//   lastName: {
//     trim: true,
//     notEmpty: true,
//     errorMessage: "lastname is required!",
//   },
//   email: {
//     trim: true,
//     isEmail: { bail: true },
//     errorMessage: "Please enter a vaild email",
//     custom: { options: checkExistingUserByEmail },
//   },
//   password: {
//     trim: true,
//     isLength: {
//       options: { min: 8 },
//       errorMessage: "password must be at least 8 characters",
//     },
//   },
//   phoneNumber: {
//     trim: true,
//     isMobilePhone: true,
//   },
// };

// const UpdateUserInfoSchema = {
//   userId: {
//     trim: true,
//     notEmpty: {
//       bail: true,
//       errorMessage: "Provide a user id",
//     },
//     errorMessage: "Invalid userId",
//     custom: {
//       options: checkExistingUserById,
//     },
//   },
//   firstName: {
//     trim: true,
//     notEmpty: true,
//     errorMessage: "Firstname is required!",
//   },
//   lastName: {
//     trim: true,
//     notEmpty: true,
//     errorMessage: "lastname is required!",
//   },
//   email: {
//     trim: true,
//     isEmail: true,
//     errorMessage: "Please enter a vaild email",
//   },

//   password: {
//     trim: true,
//     notEmpty: true,
//     errorMessage: "Enter your password to update your information",
//     isLength: {
//       options: { min: 8 },
//       errorMessage: "password must be at least 8 characters",
//     },
//   },
//   phoneNumber: {
//     trim: true,
//     isMobilePhone: true,
//   },
// };

// function validateSchema(req, res, next) {
//   try {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       return next();
//     }
//     res.status(400).json(result.array());
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function checkExistingUserByEmail(email) {
//   let col = users.returnCollection("ecommerce", "users");
//   const user = await col.findOne({ email: email });
//   if (user) {
//     throw new Error("A user with this email already exists");
//   }
//   return user;
// }

// async function checkExistingEmail(email) {
//   let col = users.returnCollection("ecommerce", "users");
//   const user = await col.findOne({ email: email });
//   return user;
// }

// async function checkExistingUserById(id) {
//   let col = users.returnCollection("ecommerce", "users");
//   let userId = new ObjectId(id);
//   const user = await col.findOne({ _id: userId });
//   if (!user) {
//     throw new Error("Invalid user id or User does not exist");
//   }
// }

// module.exports = { SignupSchema, UpdateUserInfoSchema, validateSchema, checkExistingEmail };
