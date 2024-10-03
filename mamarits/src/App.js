import logo from "./logo.svg";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./assets/mamaritsLogo.jpg";
import About from "./components/About";
import Login from "./components/login";
import MenuPage from "./components/Menu";
import Contact from "./components/Contact";

import React, { useState } from "react";

function Navbar() {
  const [position, setPosition] = useState({ left: 12 });

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="FoodHub Logo"
            className="navbar-brand"
            style={{ width: "100px", marginRight: "25px" }}
          />
          <div className="navbar-nav mr-auto d-flex flex-row">
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
        </div>
        <div className="navbar-nav ml-auto d-flex flex-row">
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
        </div>
      </div>
    </nav>
  );
}

function App() {
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
          element={<Login />}
        />
        <Route
          path="/menu"
          element={<MenuPage />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        {/*
        <Route
          path="*"
          element={<Error />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
