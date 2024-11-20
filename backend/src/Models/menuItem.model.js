const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  sizes: [
    {
      size: String,
      price: Number,
    },
  ],
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
      },
      tags: [String],
    },
  ],
  tags: [String],
  img: {
    type: String,
  },
});

module.exports = MenuItemSchema;
