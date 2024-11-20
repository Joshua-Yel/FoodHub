const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  menu: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  option: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
