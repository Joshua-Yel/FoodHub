import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from test.orders in the database
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItemFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      setCart(cart.filter((cartItem) => cartItem._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  //calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, curr) => {
      const price =
        curr.menu.sizes?.find((size) => size.size === curr.size)?.price ||
        curr.menu.price ||
        0;
      return acc + price * curr.quantity;
    }, 0);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((cartItem, index) => (
          <div
            key={cartItem._id}
            style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
          >
            <h4>
              {cartItem.menu.name} ({cartItem.size || "Regular"})
            </h4>
            <p>Quantity: {cartItem.quantity}</p>
            <p>
              Price: php {cartItem.price} x {cartItem.quantity} = php{" "}
              {cartItem.totalPrice}
            </p>
            <button onClick={() => removeItemFromCart(cartItem._id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <div>
        <h3>Total: php {calculateTotal()}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
