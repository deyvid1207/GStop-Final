// Heading.js
import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthenticationCheck';
import { useUser } from '../UserContext';
import './styles/Heading.css';
import './styles/responsive/ResponsiveHeading.css';
import * as jwt from 'jwt-decode';
import Logout from '../Logout';
 
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
  
  return (
    <div>
      <header>
        <div className="header">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/shop">All Games</NavLink></li>
            <h3 className="Title"><NavLink to="/">GStop</NavLink></h3>

            {storedUser !== null ? (
              <>
                <li className="right"><NavLink to="/dashboard">Welcome {storedUser.UserName}</NavLink></li>
                <li className="last"><button onClick={Logout}><NavLink to="/">Logout </NavLink></button></li>
              </>
            ) : (
              <>
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
