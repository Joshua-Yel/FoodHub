import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });

      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </form>
  );
}

export default SignUp;
