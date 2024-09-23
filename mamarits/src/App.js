import logo from "./logo.svg";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./assets/mamaritsLogo.jpg";

function Navbar() {
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
            >
              Find Food
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="nav-item nav-link"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-item nav-link"
            >
              Contact
            </Nav.Link>
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
        {/* <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/counter"
          element={<Counter />}
        />
        <Route
          path="*"
          element={<Error />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
