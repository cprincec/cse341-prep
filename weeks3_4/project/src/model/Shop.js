const mongoose = require("mongoose");
const createError = require("http-errors");

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Shop name is required!"]
  },

  url: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Shop url is required!"],
  },
});

const Shops = mongoose.model("Shops", ShopSchema);

module.exports = Shops;
