import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import API_URL from "../API_URL";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
 
    const handleEmail = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };


      const logIn = async (event) => {
        event.preventDefault()  

        const response = await fetch(`${API_URL}/api/accounts/Login`, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body :JSON.stringify({

                'email': email,
                'password': password,
            }),
        }) 
        console.log("After fetch");
        if (response .status !== 200) {
            console.log(response.status);
             
          } else {
            console.log("Registration successful");
            navigate("/");
          }
    }
    return <div className="login-form">  
    <form onSubmit={logIn} >
      <div className="form-div">    

        <label className="login-label">Email</label>
        <input placeholder="Email" onChange={handleEmail} className="login-input" value={email} type="email" />

        <label className="login-label">Password</label>
        <input placeholder="Password" onChange={handlePassword} className="login-input" value={password} type="password" />
       
 
        <button type="submit" className="login-createButton">Login</button>
      </div>
 
    </form>
    </div> 
}

export default Login;