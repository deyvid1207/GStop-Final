import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  './styles/Register.css'
import  './styles/responsive/ResponsiveRegister.css'
import API_URL from "../API_URL";

function Register() {
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();

  console.log(API_URL)
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleconfPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  const createAccount = async (event) => {
    event.preventDefault() 
    
  
    try {
      const response = await fetch(`${API_URL}/api/accounts/Registration`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          userName: name,
          password: password,
          confirmPassword: confirmPassword,
        }), 
      });
  
      console.log("After fetch");
  
      if (response.status !== 201) {
        console.log(response.status);
        if(password !== confirmPassword) {
          alert("Passwords must match!")
        }
        else {
          alert("Validation error, please try again!")
        }
      } else {
        console.log("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      if(error.name === "")
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Error during registration:', error);
      }
    } 
  };
  const redirectToLogin = () => {
    navigate("/login");
  };
   
 
  return (
    <div className="form">
      <div className="register-slogan">
        <h1 className="register-title">Create your account now</h1>
        <h2 className="register-subtitle">Join the biggest growing gaming shop in Europe</h2>
        <h2 className="register-subtitle">&#10004; Best Games</h2>
        <h2 className="register-subtitle">&#10004; Best Service</h2>
        <h2 className="register-subtitle">&#10004;  Best Delivery</h2>
      </div>

     
<div className="register-form">  
      <form onSubmit={createAccount}>
        <div className="form-div">
          <label className="label">Username</label>
          <input placeholder="Username" onChange={handleName} className="input" value={name} type="text" />

          <label className="label">Email</label>
          <input placeholder="Email" onChange={handleEmail} className="input" value={email} type="email" />

          <label className="label">Password</label>
          <input placeholder="Password" onChange={handlePassword} className="input" value={password} type="password" />
          <label className="label">Confirm Password</label>
          <input placeholder="Confirm Password"   onChange={handleconfPassword} className="input" value={confirmPassword} type="password" />
          <button type="submit" className="createButton">Create</button>
        </div>
        
      </form>
      <button className="to-login-Button" onClick={redirectToLogin}> Already have an account?</button>
      </div> 
 
    </div>
  );
}
export default Register;
