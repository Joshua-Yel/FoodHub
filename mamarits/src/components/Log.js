import React, { useState, useEffect } from "react";
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
import "../login-style/login-images.css";
import "../login-style/input.css";
import "../login-style/page-containers.css";
import "../login-style/login-buttons.css";

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [labelEmail, setEmailLabel] = useState({ top: "-7px" });
  const [labelPassword, setPasswordLabel] = useState({ top: "-7px" });
  const [labelFullName, setFullNameStyle] = useState({visibility: "hidden", padding: "0", margin: "-20px 0"});
  const [ buttonName, setButtonName ] = useState({text: "Login"});

  const [data, setData ] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [loginData, setLoginData] = useState({
    email:'',
    password: '',
  })


  useEffect(() => {
    console.log("rendered");
  });


  //Register 

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = data
    try{
      const {data} = await axios.post('http://localhost:5000/register', {
        name, email, password
      })

      if(data.error) {
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Register Successful.')
        navigate('/login')
      }
    } catch (error){
      console.log(error)
    }
  }


  // login

  const loginUser = async (e) =>{
    e.preventDefault();
    const {email, password} = loginData;
    try{
      const {data} = await axios.post('http://localhost:5000/login', {
        email,
        password
      })

      if(data.error){
        toast.error(data.error)
      }else {
        console.log("login successful")
        setLoginData({});
        navigate('/')
        
      }
    } catch (error) {
      console.log(error)
    }
  }
 

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
      setError(err.message);
    }
  };


  /* Swapping */ 
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSignUpClick = () => {
    setIsSwapped((prev) => !prev);
    isSwapped ? document.getElementById('fullNameContainer').style.display = 'none' : document.getElementById('fullNameContainer').style.display = 'flex'
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



  const location = useLocation();

  const isRegister = location.pathname === '/register';

  const toggleRoute = () => {
    if(isRegister){
      navigate('/login');
      console.log("Login Page")
    } else {
      navigate('/register');
      console.log("Register page")
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
       
              style = {{
                backgroundColor: `${signUpButtonStyle.backgroudColor}`,
                color: `${signUpButtonStyle.color}`,
                transition: "all ease-in-out 0.5s",
              }}
            >
              Sign up
            </button>
          </div>

          <form className="login" onSubmit={isSwapped ? registerUser : loginUser}>

            
            <div className="full-name-container"
              id = 'fullNameContainer'
              style = {{
                display: isSwapped ? 'flex' : 'none',
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
                value={data.name} onChange={(e) => setData({...data, name: e.target.value})}
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
                type="email"
                name="email"
                
                onBlur={handleBlur}
                onFocus={() => handleEmailFocus}
                placeholder="Enter your email"
                value={isSwapped ?  data.email : loginData.email } onChange={(e) => {isSwapped ? setData({...data, email: e.target.value}) : setLoginData({...loginData, email: e.target.value})}}
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
                onBlur={() => handleBlur}
                onFocus={() => handlePasswordFocus}
                placeholder="Enter your password"
                value={isSwapped ? data.password : loginData.password} 
                onChange={(e) => {isSwapped ? setData({...data, password: e.target.value}) : setLoginData({...loginData, password: e.target.value})}}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
