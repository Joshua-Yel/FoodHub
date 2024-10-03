const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const menuItems = require("./data/menu");

app.get("/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/menu/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  const menuCategory = menuItems.menu.find(
    (item) => item.category.toLowerCase() === category
  );

  if (!menuCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(menuCategory);
});

app.get("/menu/:id", (req, res) => {
  const menuId = parseInt(req.params.id);
  const menuItem = menuItems.find((p) => p.id === menuId);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }
  res.json(menuItem);
});

let cart = [];

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const { id, quantity } = req.body;

  const menuItem = menuItems.find((p) => p.id === id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const cartItem = cart.find((item) => item.menu.id === id);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ menu: menuItem, quantity });
  }

  res.json(cart);
});

app.delete("/cart/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  cart = cart.filter((item) => item.menu.id !== productId);

  res.json(cart);
});
