// Heading.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as jwt from 'jwt-decode';
import Logout from '../../utils/Logout';
import API_URL from '../../utils/API_URL';
import '../styles/Heading.css';
import '../styles/responsive/ResponsiveHeading.css';
// Define the addMoney function
async function addMoney(storedUser, setMoney) {
 
  if (!storedUser) {
    console.error('User not found.');
    return;
  }
  try {
    const response = await fetch(`${API_URL}/api/accounts/add-money`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(storedUser.Id),
    });
    const decoded = jwt.jwtDecode(localStorage.getItem('token'))
    const currentuser = await fetch(`${API_URL}/api/accounts/get-user?username=${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
    }).then(r => r.json())
    if (!response.ok) {
      // Handle error
      console.error('Failed to add money:', response.statusText);
    } else {
      // Handle success
      console.log('Money added successfully');
      localStorage.setItem('currentUser', JSON.stringify(currentuser.user));
      console.log(currentuser.user)
      setMoney(currentuser.user.Money);
      
    }
  } catch (error) {
    // Handle network error or other issues
    console.error('Error:', error.message);
  }
}

function Heading() {
  var storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const [money, setMoney] = useState(storedUser ? storedUser.Money : 0);

  // Save user data to localStorage when the user changes
  // Check if user data is in localStorage when the component mounts
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(storedUser));
  }, [storedUser]);

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
                <li className="right"   onClick={() => addMoney(storedUser, setMoney)}>{money.toFixed(2)}$</li>
                <li><NavLink to="/dashboard">Welcome {storedUser.UserName}</NavLink></li>
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
