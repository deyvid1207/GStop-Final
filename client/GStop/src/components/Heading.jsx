// Heading.js
import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthenticationCheck';
import { useUser } from '../UserContext';
import './styles/Heading.css';
import './styles/responsive/ResponsiveHeading.css';
import * as jwt from 'jwt-decode';
import Logout from '../Logout';
import API_URL from '../API_URL';
 
 
function Heading() {
 
   
 
console.log(localStorage) 
var storedUser;
  // Save user data to localStorage when the user changes
    // Check if user data is in localStorage when the component mounts
     storedUser = JSON.parse(localStorage.getItem('currentUser'));
     console.log(storedUser)
     if(storedUser) {
 
     }
  // Empty dependency array to run only once

  useEffect(() => {
    // Save user data to localStorage when the user changes
    localStorage.setItem('currentUser', JSON.stringify(storedUser));
  }, [storedUser]);
  console.log(storedUser.Id)
  async function addMoney() {
    try {
      const response = await fetch(`${API_URL}/api/accounts/add-money`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
           "Id": storedUser.Id
        }
        ),
      });
  
      if (!response.ok) {
        // Handle error
        console.error('Failed to add money:', response.statusText);
      } else {
        // Handle success
        console.log('Money added successfully');
      }
    } catch (error) {
      // Handle network error or other issues
      console.error('Error:', error.message);
    }
  }
  return (
    <div>
      <header>
        <div className="header">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/shop">All Games</NavLink></li>
      

            {storedUser !== null ? (
              <>
                     <h3 className="Title-If"><NavLink to="/">GStop</NavLink></h3>
                <li  className="right" onClick={addMoney}>{storedUser.Money}$</li>
                <li ><NavLink to="/dashboard">Welcome {storedUser.UserName}</NavLink></li>
               
                <li className="last"><button onClick={Logout}><NavLink to="/">Logout </NavLink></button></li>
              </>
            ) : (
              <>
                 <h3 className="Title"><NavLink to="/">GStop</NavLink></h3>
                <li className="right"><NavLink to="/register">Register</NavLink></li>
                <li className="last"><NavLink to="/login">Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Heading;
