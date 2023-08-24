const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: {
    type: String,
    trim: true,
    required: [true],
  },
});
