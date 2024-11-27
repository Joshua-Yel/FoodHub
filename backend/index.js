const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MenuCategory = require("./src/Models/menuCategory.model");
const Order = require("./src/Models/order.model");
const User = require("./src/Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received Signup Data:", req.body); // Log the received data

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error:'Email is already taken' });
      
  }

  // Password strength validation (you can adjust this as needed)
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Request Body:", req.body); // Add this log
  
  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));


app.get("",async (req, res) => {
  try{
    const orderCount = await Order.countDocuments();
    res.status(200).json({count:orderCount});
  } catch (error) {
    console.error("Error counting orders:", error);
    res.status(500).json({ error: "Failed to count orders" });
  }
})


app.post("/api/menu", async (req, res) => {
  try {
    const menuData = req.body;
    const menu = await MenuCategory.create(menuData);
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const menuCategories = await MenuCategory.find();
    res.json(menuCategories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching menu data" });
  }
});

app.get("/menu/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const menuCategory = await MenuCategory.findOne({
      category: new RegExp(`^${category}$`, "i"),
    });

    if (!menuCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(menuCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the category" });
  }
});
app.put("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const { options } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid menu item ID" });
  }

  try {
    // Step 1: Find the `MenuCategory` document containing the item
    const menuCategory = await MenuCategory.findOne({ "items._id": id });
    if (!menuCategory) {
      console.error("MenuCategory document containing the item not found.");
      return res.status(404).json({ message: "Menu item not found" });
    }
    console.log("MenuCategory found:", menuCategory);

    // Step 2: Locate the specific item within the items array
    const itemIndex = menuCategory.items.findIndex(
      (item) => item._id.toString() === id
    );
    if (itemIndex === -1) {
      console.error("Item not found in items array.");
      return res
        .status(404)
        .json({ message: "Menu item not found in items array" });
    }

    // Step 3: Update the options of the located item within items array
    menuCategory.items[itemIndex].options = options;

    // Step 4: Save the updated document
    await menuCategory.save();
    console.log(
      "Options updated successfully for item:",
      menuCategory.items[itemIndex]
    );

    res.json({
      message: "Options updated successfully",
      updatedItem: menuCategory.items[itemIndex],
    });
  } catch (error) {
    console.error("Error updating menu item options:", error);
    res.status(500).json({ message: "Failed to update menu item options" });
  }
});

app.get("/menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ message: "Invalid menu item ID" });
    }

    const menuCategory = await MenuCategory.findOne(
      { "items._id": menuId },
      { "items.$": 1 }
    );

    if (
      !menuCategory ||
      !menuCategory.items ||
      menuCategory.items.length === 0
    ) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const menuItem = menuCategory.items[0];
    res.json(menuItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the menu item" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Order.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

app.post("/cart", async (req, res) => {
  const { id, quantity, size } = req.body;
  console.log("Request received to add item to cart:", { id, quantity, size });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid menu item ID");
    return res.status(400).json({ message: "Invalid menu item ID" });
  }

  try {
    const menuCategory = await MenuCategory.findOne(
      { "items._id": id },
      { "items.$": 1 }
    );

    if (
      !menuCategory ||
      !menuCategory.items ||
      menuCategory.items.length === 0
    ) {
      console.error("Menu item not found");
      return res.status(404).json({ message: "Menu item not found" });
    }

    const menuItem = menuCategory.items[0];
    console.log("Found menu item:", menuItem);

    let price = menuItem.price;
    if (menuItem.sizes && menuItem.sizes.length > 0) {
      const sizeObj = menuItem.sizes.find((s) => s.size === size);
      price = sizeObj ? sizeObj.price : menuItem.price;
    }
    console.log("Calculated price:", price);

    const existingOrderItem = await Order.findOne({ "menu._id": id });
    if (existingOrderItem) {
      console.log("Item already in cart. Updating quantity and total price...");
      existingOrderItem.quantity += quantity;
      existingOrderItem.totalPrice = existingOrderItem.quantity * price;
      await existingOrderItem.save();
      console.log("Updated cart item:", existingOrderItem);
      res.json(existingOrderItem);
    } else {
      console.log("Creating new order item...");
      const newOrder = new Order({
        menu: menuItem,
        quantity,
        size: size || "Regular",
        price,
        totalPrice: quantity * price,
      });
      await newOrder.save();
      console.log("New order item saved:", newOrder);
      res.status(201).json(newOrder);
    }
  } catch (error) {
    console.error("Server error while adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.delete("/cart/:id", async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  try {
    const result = await Order.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item from cart" });
  }
});

app.delete('/cart', async (req, res) => {
  console.log("DELETE /cart route triggered");
  try {
    const result = await Order.deleteMany({});
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No items found in the cart' });
    }

    res.json({ message: 'All items removed from cart' });
  } catch (error) {
    console.error("Error deleting items from cart:", error);
    res.status(500).json({ error: 'Failed to delete items from cart' });
  }
});

const calculateTotalPrice = async () => {
  const cartItems = await Order.find();
  return cartItems.reduce((total, item) => {
    const price =
      item.menu.sizes?.find((size) => size.size === item.size)?.price ||
      item.menu.price ||
      0;
    return total + price * item.quantity;
  }, 0);
};

app.get("/cart/total", async (req, res) => {
  try {
    const totalPrice = await calculateTotalPrice();
    res.json({ total: totalPrice });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate total price" });
  }
});
