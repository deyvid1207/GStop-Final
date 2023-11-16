import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 

function Register() {
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const createAccount = async (event) => {
    event.preventDefault() 
    
  
    try {
      const response = await fetch(`https://localhost:7293/api/accounts/Registration`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          userName: name,
          password: password,
          confirmPassword: password,
        }), 
      });
  
      console.log("After fetch");
  
      if (response.status !== 201) {
        console.log(response.status);
      } else {
        console.log("Registration successful");
        navigate("/login");
      }
    } catch (error) {
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
        <h2>Join the biggest growing gaming shop in Europe</h2>
      </div>

      <div className="messages"></div>

      <form onSubmit={createAccount}>
        <div className="form-div">
          <label className="label">Username</label>
          <input onChange={handleName} className="input" value={name} type="text" />

          <label className="label">Email</label>
          <input onChange={handleEmail} className="input" value={email} type="email" />

          <label className="label">Password</label>
          <input onChange={handlePassword} className="input" value={password} type="password" />

          <button type="submit">Create</button>
        </div>
       
      </form>
      <button onClick={redirectToLogin}>Already have an account?</button>
    </div>
  );
}
export default Register;
