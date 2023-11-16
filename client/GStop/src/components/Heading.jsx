import { useEffect, useState } from "react";
import './styles/Heading.css'; 
import './styles/responsive/ResponsiveHeading.css'; 
import { Outlet , NavLink } from "react-router-dom";

function Heading() {
 

  return (
    <div>
       <header>
        <div className="header"> 
        <ul>
           <li><NavLink  to="/">Home</NavLink ></li>
           <li><NavLink to="/games">All Games</NavLink></li>
           <h3 className="Title"><NavLink to="/">GStop</NavLink></h3>
           <li className="right"><NavLink to="/register">Register</NavLink></li>
           <li className="last"><NavLink to="/login">Login</NavLink></li>
        </ul>
        </div>
       </header>
       <Outlet />
    </div>
  );
}

export default Heading;
