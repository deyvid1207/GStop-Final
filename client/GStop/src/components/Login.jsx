import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
import API_URL from "../API_URL";
import * as jwt from 'jwt-decode';

function Login() {
  const { user, updateUser } = useUser();
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
    event.preventDefault();

    const response = await fetch(`${API_URL}/api/accounts/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
      }),
    });
    
    if (response.status === 200) {
      const data = await response.json();
      console.log("Login successful");
       

      // Save the token to localStorage
      localStorage.setItem('token', data.token);
      console.log(localStorage);
      // Decode the token
      const decoded = jwt.jwtDecode(localStorage.getItem('token'))
      const currentuser = await fetch(`${API_URL}/api/accounts/get-user?username=${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      }).then(r => r.json())
      updateUser(currentuser);
      console.log(currentuser);
      
      // The decoded object will contain the claims in the JWT token
      console.log(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);

      // You can access specific claims like this:
 

      // Redirect to the desired page
      navigate("/");
    } else {
      console.log("Login failed");
      console.log(response.status);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={logIn}>
        <div className="form-div">
          <label className="login-label">Email</label>
          <input placeholder="Email" onChange={handleEmail} className="login-input" value={email} type="email" />

          <label className="login-label">Password</label>
          <input placeholder="Password" onChange={handlePassword} className="login-input" value={password} type="password" />

          <button type="submit" className="login-createButton">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
