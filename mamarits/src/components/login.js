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
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [labelEmail, setEmailLabel] = useState({top:'-7px'});
  const [labelPassword, setPasswordLabel] =useState({top:'-7px'});

  const handleEmailFocus = () => {
    setEmailLabel({top:'-20px'});
  };

  const handlePasswordFocus = () => {
    setPasswordLabel({top:'-20px'});
  };

  const handleBlur = () => {
    if (document.getElementById('email').value === '' && document.getElementById('password').value === ''){
      setPasswordLabel({top:'-7px'});
      setEmailLabel({top:'-7px'});
    }
  };
    
  


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

        <div className="login-right-section">
          <div className="buttons-container">
            <button className="login-button">Login</button>
            <button className="sign-up-button">Sign up</button>
          </div>
          
          <form>
            <div className="email-container">
              <label 
                  for="email" 
                  className="email-label"
                  style = {{
                    top: labelEmail.top,
                  }}
                >Email</label>
              <input  id="email" 
                      type="text"
                      name="email" 
                      value={email} 
                      onBlur={handleBlur}
                      onFocus={handleEmailFocus}
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Enter your email" 
                      required/>
            </div>
            <div className="password-container">
              <label 
                  for="password" 
                  className="password-label"
                  style = {{
                    top: labelPassword.top,
                  }}>Password</label>
              <input  id="password"
                      type="password"
                      name="password"
                      value={password}
                      onBlur={handleBlur}
                      onFocus={handlePasswordFocus}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required/>
            </div>


            <div className="lower-section-container">
              <button className="login-button" type="submit" onClick={handleLogin}>Login</button>
              
              <p
                style= {{
                  color: "gray"
                }}
              >-------------- Sign in with --------------</p>

              <div className="google-logo-container">
                <img className="google-logo" onClick={handleGoogleLogin} src={Google_logo}></img>
              </div>

            </div>
            
          </form>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default Login;
