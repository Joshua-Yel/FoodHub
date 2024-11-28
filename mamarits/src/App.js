import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import axios from 'axios'
import {Toaster, toast} from 'react-hot-toast'
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./assets/mamaritsLogo.jpg";
import About from "./components/About";
import Login from "./components/login";
import MenuPage from "./components/Menu";
import Contact from "./components/Contact";
import Order from "./components/Order";
import CartPage from "./components/CartPage";
import CartImg from './assets/cart.png'
import menuData from "./components/menu.json";
import Home from "./components/Home";
import ContactInfo from "./components/ContactInfo";
import { auth } from "./components/firebase/config"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import SignUp from "./components/SignUp";



// Navbar Component
function Navbar() {
  const [position, setPosition] = useState({ left: 36, display: 'none' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      // You can add more logic here to verify the token if needed
      setUser({ token }); // If token exists, set user
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    navigate('/')
    setUser(null); // Update the user state to null
 
    window.location.reload();
  };

  const deleteAllCartItems = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/cart')
      toast.success("Log out successfully!")
    } catch (error) {
      console.error('Error deleting cart item: ', error);
    }
  }

  const handleClick = (page) => {
    if (page === "find-food") {
      setPosition({ left: 36,display:'none' });
    } else if (page === "about") {
      setPosition({ left: 60, display:'none' });
    } else if (page === "order") {
      setPosition({ left: 84, display:'flex' });
    } else {
      console.log("Unknown Button");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-center position-relative bg-black">
      <header className="ml-auto d-flex flex-row flex-wrap justify-content-center">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between">
            <div className="navbar-nav mr-auto d-flex flex-row">
              <img
                src={Logo}
                alt="FoodHub Logo"
                className="navbar-brand"
                style={{ width: "100px", marginRight: "25px" }}
              />
              <Nav.Link
                as={Link}
                to="/"
                className="nav-item nav-link"
                onClick={() => handleClick("find-food")}
              >
                Find Food
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="nav-item nav-link"
                onClick={() => handleClick("about")}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/order"
                className="nav-item nav-link"
                onClick={() => handleClick("order")}
                
              >
                Order Now
              </Nav.Link>
              <div
                className="tooltip-bar"
                style={{
                  left: `${position.left}%`, // Ensure `position` is properly defined if needed
                }}
              ></div>
            </div>

            <div className="navbar-nav ml-auto d-flex flex-row">
              {user ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="cart-link"
                    style={{
                      display: `${position.display}`,
                    }}
                  >
                    <img className="cart-img" src={CartImg}></img>
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="nav-item nav-link"
                    onClick={
                      () => {
                        handleLogout();
                        deleteAllCartItems();
                      }
                    }
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="nav-item nav-link"
                >
                  Login
                </Nav.Link>
              )}
            </div>
          </div>
        </div>
        <ContactInfo />
      </header>
    </nav>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration:3000}}/>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
            path='/register'
            element={<Login/>}
        />
        <Route
          path="/menu"
          element={<MenuPage />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/order"
          element={<Order />}
        />
        <Route
          path="/cart"
          element={<CartPage menu={menuData.menu} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
