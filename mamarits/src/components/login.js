import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { auth } from "./firebase/config";
// import "./login.css";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form className="login-container col-md-6 mx-auto d-flex flex-column align-items-center justify-content-center">
      <Helmet>
        <title>Login - Mamarits</title>
        <meta
          name="description"
          content="Login to Mamarits to access your account. Sign in with your email or use Google authentication for easy access."
        />
        <meta
          name="keywords"
          content="Login, Mamarits, user login, Google sign-in, authentication"
        />
      </Helmet>
      <h2>Login to Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      <Form.Group>
        <Form.Control
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <Form.Control
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          onClick={handleLogin}
          className="btn-primary"
        >
          Login
        </Button>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="btn-sucess google-login"
        >
          Login with Google
        </Button>
      </Form.Group>
      <p>
        Don’t have an account yet?{" "}
        <NavLink
          to="/signup"
          className="signup-link"
        >
          Sign Up
        </NavLink>
      </p>
    </Form>
  );
};

export default Login;
