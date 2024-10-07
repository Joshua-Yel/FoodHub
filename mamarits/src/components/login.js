import React, { useState, useRef, useEffect } from "react";
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
import Image1 from "../assets/image1.png";
import Google_logo from "../assets/google-logo.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import MamaritsLogo from "../assets/mamarits-logo.png"

import { auth } from "./firebase/config";
//import './login.css';
import "../login-style/login-images.css";
import "../login-style/login-images.css";
import "../login-style/input.css";
import "../login-style/page-containers.css";
import "../login-style/login-buttons.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [labelEmail, setEmailLabel] = useState({ top: "-7px" });
  const [labelPassword, setPasswordLabel] = useState({ top: "-7px" });
  const [labelFullName, setFullNameStyle] = useState({visibility: "hidden", padding: "0", margin: "-20px 0"});
  const [ buttonName, setButtonName ] = useState({text: "Login"});

  const handleButtonName = (button) => {
    if (button === "login") {
      setButtonName({text: "Login"});
    } else if (button == "signup") {
      setButtonName({text: "Sign up"});
    }
  };
  
  
  const handleFullName = (button) => {
    if (button === "signup") {
      setFullNameStyle({padding: "10px", visibility:"visible", width: "100%", margin: "15px 0"});
    } else if (button === "login"){
      setFullNameStyle({padding: "0", margin: "-20px 0" ,visibility: "hidden"});
    }
  }

  




  const handleEmailFocus = () => {
    setEmailLabel({ top: "-20px" });
  };

  const handleFullNameFocus = () => {
    setFullNameStyle({ top: "-20px"});
  };

  const handlePasswordFocus = () => {
    setPasswordLabel({ top: "-20px" });
  };

  const handleBlur = () => {
    if (
      document.getElementById("email").value === "" &&
      document.getElementById("password").value === "" &&
      document.getElementById("fullName").value === ""
    ) {
      setPasswordLabel({ top: "-7px" });
      setEmailLabel({ top: "-7px" });
      setFullNameStyle({ top: "-7px" });
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


  /* Swapping */ 
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSignUpClick = () => {
    setIsSwapped((prev) => !prev);
  };


  /* Submit  */


  const toggleButton = (clickedButtonId, otherButtonId) =>{
    document.getElementById(clickedButtonId).disabled = true;
    document.getElementById(otherButtonId).disabled=false;
  }

  /* Color change */
 

  const [loginButtonStyle, setLoginButtonStyle] = useState({backgroudColor: '', color:''});
  const [signUpButtonStyle, setSignUpButtonStyle] = useState({backgroudColor: '', color:''});

  const handleButtonStyle = (button) => {
    if (button === "login"){
      setLoginButtonStyle({ color: "black", backgroudColor:"transparent"});
      setSignUpButtonStyle({color:"white", backgroudColor:"black"});
    }else if(button === "signUp"){
      setLoginButtonStyle({ color: "white", backgroudColor:"black"});
      setSignUpButtonStyle({ color: "black", backgroudColor:"transparent"});
    }
  }

  return (
    <div className="login-page-container">
      <div className={`left-right-container ${isSwapped ? "swapped" : "loginSwapped"}`}>
        <div className="login-left-section">
          <img
            className="image1"
            src={Image1}
          />
          <img
            className="image2"
            src={Image2}
          />
          <img
            className="image3"
            src={Image3}
          />
          <img
            className="logo-mamarits"
            src={MamaritsLogo}
          />
        </div>

        <div className="login-right-section">
          <div className="buttons-container">
            <button
              id="login-button"
              className="login-button"
              onClick={() => {
                handleSignUpClick();
                toggleButton('login-button','signUpButton');
                handleButtonStyle("login");
                handleFullName("login");
                handleButtonName("login");
              }}
              style = {{
                backgroundColor: `${loginButtonStyle.backgroudColor}`,
                color: `${loginButtonStyle.color}`, 
                transition: "all ease-in-out 0.5s",
              }}
            >
              Login
            </button>
            <button
              id="signUpButton"
              type="button"
              className="sign-up-button"
              onClick={() => {
                handleSignUpClick();
                toggleButton('signUpButton', 'login-button');
                handleButtonStyle("signUp");
                handleFullName("signup");
                handleButtonName("signup");
              }}
              style = {{
                backgroundColor: `${signUpButtonStyle.backgroudColor}`,
                color: `${signUpButtonStyle.color}`,
                transition: "all ease-in-out 0.5s",
              }}
            >
              Sign up
            </button>
          </div>

          <form className="login">
            <div className="full-name-container"
              style = {{
                
                margin: `${labelFullName.margin}`,
                visibility: `${labelFullName.visibility}`,
                transition: "all ease-in-out 0.25s",
              }}
              
            >
              <label 
                for="fullName"
                className="full-name-label"
                style={{
                  top: `${labelFullName.top}`,
                  visibility: `${labelFullName.visibility}`,
                  transition: "all ease-in-out 0.15s",
                }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                onFocus={handleFullNameFocus}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                style ={{
                  padding: `${labelFullName.padding}`,
                  width: `${labelFullName.width}`,
                  visibility: `${labelFullName.visibility}`,
                  transition: "all ease-in 0.25s",
                }}
              />
            </div>
            <div className="email-container">
              <label
                for="email"
                className="email-label"
                style={{
                  top: labelEmail.top,
                  transition: "all ease-in-out 0.15s",
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onBlur={handleBlur}
                onFocus={handleEmailFocus}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="password-container">
              <label
                for="password"
                className="password-label"
                style={{
                  top: labelPassword.top,
                  transition: "all ease-in-out 0.15s",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onBlur={handleBlur}
                onFocus={handlePasswordFocus}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="lower-section-container">
              <button
                className="login-button"
                type="submit"
                onClick={handleLogin}
              >
                {buttonName.text}
              </button>

              <p
                id="login-or-signup"
                style={{
                  color: "gray",
                }}
                
              >
                --------------  {buttonName.text} with --------------
              </p>

              <div className="google-logo-container">
                <img
                  className="google-logo"
                  onClick={handleGoogleLogin}
                  src={Google_logo}
                ></img>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
