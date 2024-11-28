import React, { useState, useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./checkouts.css";
import {toast} from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [receipt, setReceipt] = useState(false); 
  const [amount, setAmount] = useState();
  const [change, setChange] = useState();


  const [selectedOrderType, setSelectedOrderType] = useState('');
  
  const handleOrderTypeChange = (event) => {
    setSelectedOrderType(event.target.value);
  };
  const upperLimit = 100;
  const randomInt = Math.floor(Math.random() * upperLimit) + 1;

  // function handleOrderType(){
    
  // }

  // function handleDineIn(){
    
  // }

  function handleCheckout(){
    setCheckout((prev) => prev = true)
  }

  function handleCancel(){
    setCheckout((prev) => prev = false)
  }

  function handleProceed(){
    if (amount === 0 || amount < (calculateTotal())){
      toast.error("Insufficient amount. Try Again!")
    } else if(amount >= (calculateTotal())) {
      handleChange();
      handleReceipt();
      handleCancel();
    } else {
      console.log("Invalid input")
    }
  }

  function handleReceipt(exit){
    setReceipt((prev) => prev = true);
    if(exit === "x"){
      setReceipt((prev) => prev = false);
    }
  }
  
  function handleChange(){
    setChange(amount - (calculateTotal()))
  }



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
          <button className="btn btn-outline-light btn-lg " onClick={handleCheckout}>Checkout</button>
          {checkout && (
            <div className="cash-amount-input">
                <p className="title">Amount</p>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter your cash amount"/>
                <p className="choose-type">Choose your order type:</p>
                <div className="order-type-container">
                  <label>
                    <input
                      type="radio"
                      name="order_type"
                      value="dinein"
                      checked={selectedOrderType === 'dinein'}
                      onChange={handleOrderTypeChange}
                    />
                    Dine-in
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="order_type"
                      value="takeout"
                      checked={selectedOrderType === 'takeout'}
                      onChange={handleOrderTypeChange}
                    />
                    Takeout
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="order_type"
                      value="delivery"
                      checked={selectedOrderType === 'delivery'}
                      onChange={handleOrderTypeChange}
                    />
                    Delivery
                  </label>
                </div>

              
                
                <div className="buttons-container">
                    <button className="proceed" onClick={handleProceed}>PROCEED</button>
                    <button className="cancel" onClick={handleCancel}>CANCEL</button>
                </div>

                

            </div>
          )}
        </div>
      </div>

      {receipt && (
        

        
        <div className="checkoutbody">
        
          <div className="checkout-container">
            <div className="upper-receipt-container">
              <img className="logo-mamarits" src="../assets/mamarits-logo.png" alt="Mamarits Logo" />
              <p>3001 Kaalinsabay,</p>
              <p>Pasig Metro Manila</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
            <div className="line-container">
            <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
            <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
            </div>
            <div className="middle-receipt-container">
              <ul>
                <li className="name">
                        <p className="category">Name</p>
                      
                </li>
                <li className="qty">
                        <p className="category">Qty</p>
                        
                </li>
                <li className="price">
                        <p className="category">Price</p>
            
                </li>
                </ul>
                {cart && cart.length > 0 ? (
                  cart.map((cartItem) => (
                    <ul key={cartItem._id}> {/* Add the key here to ensure each item is uniquely identified */}
                      <li className="name">
                        <p>{cartItem.menu.name}</p> {/* Dynamic name */}
                      </li>
                      <li className="qty">
                        <p>{cartItem.quantity}</p> {/* Dynamic quantity */}
                      </li>
                      <li className="price">
                        <p>₱{cartItem.price}</p> {/* Dynamic price */}
                      </li>
                    </ul>
                  ))
                ) : (
                  <p>No item</p>
                )}

              
            </div>
            <div className="line-container">
              <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
              <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
            </div>
            <div className="lower-receipt-container">
              <div className="sub-total-container">
                <p className="sub">Sub Total</p>
                <p className="amount">₱{calculateTotal()}</p> {/* Dynamic total price */}
              </div>
              <div className="cash-amount-container">
                <p>CASH</p>
                <p>₱{amount}</p> {/* This can also be dynamic if needed */}
              </div>
              <div className="change-container">
                <p>CHANGE</p>
                <p>₱{change}</p> {/* This can also be dynamic if needed */}
              </div>
            </div>
            <div className="line-container">
              <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
              <p className="line">&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
            </div>
           
                <div className="table-number-container">
                  <p>Table Number: {randomInt}</p>
                </div>
              
            <p className="exit-button" onClick={() => handleReceipt("x")}>X</p>
          </div>

          
        
        </div>
    
        
        
      )};


      
    </div>
  );
};

export default CartPage;
