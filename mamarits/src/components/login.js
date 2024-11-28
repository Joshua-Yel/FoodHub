import React, { useState, useEffect,useRef } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  useNavigate,
  useLocation
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
import "../login-style/input.css";
import "../login-style/page-containers.css";
import "../login-style/login-buttons.css";
// import './login.css';

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const [labelEmail, setEmailLabel] = useState({ top: "-7px" });
  const [labelPassword, setPasswordLabel] = useState({ top: "-7px" });
  const [labelFullName, setFullNameStyle] = useState({visibility: "hidden", padding: "0", margin: "-20px 0"});
  const [ buttonName, setButtonName ] = useState({text: "Login"});
  const [leftContainer, setLeftContainer] = useState();
  const [rightContainer, setRightContainer] = useState();

  function handleMoveContainer(){
    if(isSwapped){

    }
  }

  // const [data, setData ] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  // })

  // const [loginData, setLoginData] = useState({
  //   email:'',
  //   password: '',
  // })


  useEffect(() => {
    console.log("rendered");
  });


  //Register 

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      console.log("Signup successful:", response.data);
      toast.success('Signup successful')
      navigate('/login')
      window.location.reload() // Redirect to login page after successful sign-up
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      // setError(
      //   error.response?.data?.message || "An error occurred during signup."
      // );
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Login request data:", { email, password }); // Add this log
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      // Store the JWT token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to the home page or another protected route
      toast.success('Log in was successful')
      
      console.log("Log in was successful");
      navigate("/");
      window.location.reload()
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      toast.error(errorMessage); // Display the error using react-hot-toast
      console.error("Login Error:", errorMessage);
    }
  };
 

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
      setFullNameStyle({display: 'none'});
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

    passwordLabel();
    emailLabel();
    fullNameLabel();
  };

  function passwordLabel(){
    if(document.getElementById("password").value === ""){
      setPasswordLabel({ top: "-7px" });
    }
  }

  function emailLabel(){
    if(document.getElementById("email").value === ""){
      setEmailLabel({ top: "-7px"});
    }
  }



  const fullNameRef = useRef(null);
  
  const fullNameLabel = () => {
    if (!isSwapped) {
      console.log("Full Name container is hidden");
      return;
    }
    if (fullNameRef.current && fullNameRef.current.value === "") {
      setFullNameStyle({ top: "-7px" });
    }
  };


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      // setError(err.message);
    }
  };


  /* Swapping */ 
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSignUpClick = () => {
    setIsSwapped((prev) => !prev);
  }

  


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



  const location = useLocation();

  const isRegister = location.pathname === '/register';



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
                navigate('/login')
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
                navigate('/register')
              }}
              disabled={isRegister}
              style = {{
                backgroundColor: `${signUpButtonStyle.backgroudColor}`,
                color: `${signUpButtonStyle.color}`,
                transition: "all ease-in-out 0.5s",
              }}
            >
              Sign up
            </button>
          </div>


          
          {isSwapped ? (
            <form className="login" onSubmit={registerUser}>
              <div className="full-name-container"
                id = 'fullNameContainer'
                style = {{
                  display: isSwapped ? 'flex' : 'none',
                  margin: `${labelFullName.margin}`,
                  // visibility: `${labelFullName.visibility}`,
                  transition: "all ease-in-out 0.25s",
                }}
                
              >
                <label 
                  htmlFor="fullName"
                  className="full-name-label"
                  style={{
                    top: `${labelFullName.top}`,
                    // visibility: `${labelFullName.visibility}`,
                    transition: "all ease-in-out 0.15s",
                  }}
                >
                  Full Name
                </label>
                <input
                  ref={fullNameRef}
                  id="fullName"
                  type="text"
                  onFocus={handleFullNameFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  style ={{
                    padding: `${labelFullName.padding}`,
                    width: `${labelFullName.width}`,
                    // visibility: `${labelFullName.visibility}`,
                    transition: "all ease-in 0.25s",
                  }}
                  value={name} 
                  // onChange={(e) => setData({...data, name: e.target.value})}
                  onChange = {(e) => setName(e.target.value)}
                />
              </div>
              <div className="email-container">
                <label
                  htmlFor="email"
                  className="email-label"
                  style={{
                    top: `${labelEmail.top}`,
                    transition: "all ease-in-out 0.15s",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  
                  onBlur={emailLabel}
                  onFocus={handleEmailFocus}
                  placeholder="Enter your email"
                  value={email} 
                  // onChange={(e) => setData({...data, email: e.target.value})}
                  onChange = {(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-container">
                <label
                  htmlFor="password"
                  className="password-label"
                  style={{
                    top: `${labelPassword.top}`,
                    transition: "all ease-in-out 0.15s",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onFocus={handlePasswordFocus}
                  placeholder="Enter your password"
                  value={password} 
                  // onChange={(e) => setData({...data, password: e.target.value})}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="lower-section-container">
                <button
                  className="login-button"
                  type="submit"
                  
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

          ) : (
            <form className="login" onSubmit={loginUser}>
              <div className="email-container">
                <label
                  htmlFor="email"
                  className="email-label"
                  style={{
                    top:`${labelEmail.top}`,
                    transition: "all ease-in-out 0.15s",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  
                  onBlur={emailLabel}
                  onFocus={handleEmailFocus}
                  placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-container">
                <label
                  htmlFor="password"
                  className="password-label"
                  style={{
                    top:`${labelPassword.top}`,
                    transition: "all ease-in-out 0.15s",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onFocus={handlePasswordFocus}
                  placeholder="Enter your password"
                  // value={loginData.password} 
                  // onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="lower-section-container">
                <button
                  className="login-button"
                  type="submit"
                  
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
          )}
          
          

          
          
        </div>
      </div>
    </div>
  );
};

export default Login;
