import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Calculate total price
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
    <div className="container my-5">
      <h1 className="text-center text-white bg-black py-3 rounded">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div
          className="alert alert-danger text-center"
          role="alert"
        >
          Your cart is empty
        </div>
      ) : (
        <div className="list-group">
          {cart.map((cartItem) => (
            <div
              key={cartItem._id}
              className="list-group-item d-flex justify-content-between align-items-center mb-3"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
              }}
            >
              <div>
                <h5>
                  {cartItem.menu.name}{" "}
                  <span className="badge bg-secondary">
                    {cartItem.size || "Regular"}
                  </span>
                </h5>
                <p className="mb-0">Quantity: {cartItem.quantity}</p>
                <p className="text-danger fw-bold">
                  php {cartItem.price} x {cartItem.quantity} = php{" "}
                  {cartItem.totalPrice}
                </p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeItemFromCart(cartItem._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-black text-white p-4 mt-4 rounded">
        <h3 className="text-center">
          Total: <span className="text-danger">php {calculateTotal()}</span>
        </h3>
        <div className="text-center">
          <button className="btn btn-outline-light btn-lg ">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
