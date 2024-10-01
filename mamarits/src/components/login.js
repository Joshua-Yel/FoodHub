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
import Image1 from '../assets/image1.png'
import Google_logo from '../assets/google-logo.png';
import Image2 from '../assets/image2.png'
import Image3 from '../assets/image3.png'
import MamaritsLogo from '../assets/mamaritsLogo.jpg'

import { auth } from "./firebase/config";
// import "./login.css";

import './login.css';

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
    <div className="login-page-container">
      <div className="left-right-container">
        <div className="login-left-section">
          <img className="image1" src={Image1}/>
          <img className="image2" src={Image2}/>
          <img className="image3" src={Image3}/>
          <img className="logo-mamarits" src={MamaritsLogo}/>
        </div>
        
        <form>
          <div className="email-container">
            <label for="email">Email</label>
            <input  id="email" 
                    type="text"
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    required/>
          </div>
          <div className="password-container">
            <label for="password">Password</label>
            <input  id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required/>
          </div>
          <button className="login-button" type="submit" onClick={handleLogin}>Login</button>
          
          <p>-------------- Sign in with --------------</p>
          <img className="google-logo" src={Google_logo}></img>
        </form>
      </div>
      
    </div>
    
  );
};

export default Login;
