const mongoose = require("mongoose");
const MenuItemSchema = require("./menuItem.model"); // Make sure this path is correct

// Define the MenuCategory schema, embedding MenuItemSchema in the `items` array
const MenuCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  options: [String], // e.g., ["ICED", "HOT"]
  items: [MenuItemSchema], // Embedding the MenuItem schema here
});

// Export the MenuCategory model
module.exports = mongoose.model("MenuCategory", MenuCategorySchema);
