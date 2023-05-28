const mongoose = require("mongoose");
const createError = require("http-errors");
const bcrypt = require('bcrypt')
const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required!"],
    validate: {
      validator: function (email) {
        console.log(email);
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
      },
      message: "Please enter a valid email",
    },
  },

  firstName: {
    type: String,
    trim: true,
    required: [true, "Firstname is required!"],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, "Lastname is required!"],
  },

  oAuth: {
    type: String,
    default: "0",
    trim: true,
    required: [true, "Sign up method not indicated"],
  },

  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minLength: [8, "password must be atleast 8 characters"],
  },

  phoneNumber: {
    type: String,
    trim: true,
  },
});

signupSchema.pre("validate", function () {
  if (this.oAuth == "1") {
    this.schema.path("password").required(false);
    this.schema.path("password").minLength(0);
  }
});

signupSchema.pre("validate", async function (next) {
  let User = this.constructor;
  let existingUser = await User.findOne({ email: this.email });
  if (existingUser) {
    throw createError(400, "User already exists");
  } else {
    return false;
  }
});

signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", signupSchema);

module.exports = User;
