import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./assets/mamaritsLogo.jpg";
import About from "./components/About";
import Login from "./components/login";
import MenuPage from "./components/Menu";
import Contact from "./components/Contact";
import Order from "./components/Order";
import CartPage from "./components/CartPage";
import menuData from "./components/menu.json";
import Home from "./components/Home";
import ContactInfo from "./components/ContactInfo";
import { auth } from "./components/firebase/config"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import SignUp from "./components/SignUp";

function Navbar() {
  const [position, setPosition] = useState({ left: 12 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleClick = (page) => {
    if (page === "find-food") {
      setPosition({ left: 12 });
    } else if (page === "about") {
      setPosition({ left: 43 });
    } else if (page === "contact") {
      setPosition({ left: 72.5 });
    } else {
      console.log("Unknown Button");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark d-flex  justify-content-center position-relative bg-black">
      <header className=" ml-auto d-flex flex-row flex-wrap justify-content-center">
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
                to="/contact"
                className="nav-item nav-link"
                onClick={() => handleClick("contact")}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/order"
                className="nav-item nav-link"
                onClick={() => handleClick("order")}
              >
                Order Now
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/menu"
                className="nav-item nav-link"
              ></Nav.Link>
              <div
                className="tooltip-bar"
                style={{
                  left: `${position.left}%`,
                }}
              ></div>
            </div>
            <div className="navbar-nav ml-auto d-flex flex-row ">
              {user ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="nav-item nav-link"
                  >
                    Cart
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/logout"
                    className="nav-item nav-link"
                    onClick={() => auth.signOut()}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="nav-item nav-link"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    className="nav-item nav-link"
                  >
                    Signup
                  </Nav.Link>
                </>
              )}
            </div>
          </div>
        </div>
        <ContactInfo />
      </header>
    </nav>
  );
}

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
          path="/signup"
          element={<SignUp />}
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
        />{" "}
        {/* <Route
          path="*"
          element={<Error />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
