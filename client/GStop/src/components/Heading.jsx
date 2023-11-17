import { useEffect, useState } from "react";
import './styles/Heading.css'; 
import './styles/responsive/ResponsiveHeading.css'; 
import { Outlet, NavLink } from "react-router-dom";
import { useUser } from '../UserContext';

function Heading() {
  const { user, updateUser } = useUser();
  const [isLoggedIn, setTrue] = useState(false);

  useEffect(() => {
    // Use useEffect to update the state only after the component has rendered
    if (user) {
      setTrue(true);
    } else {
      setTrue(false);
    }
  }, [user]);

  return (
    <div>
      <header>
        <div className="header">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/games">All Games</NavLink></li>
            <h3 className="Title"><NavLink to="/">GStop</NavLink></h3>

            {isLoggedIn ? (
              <>
                <li className="right"><NavLink to="/dashboard">Welcome ${user.UserName}</NavLink></li>
                <li className="last"><NavLink to="/logout">Logout</NavLink></li>
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
      <Outlet />
    </div>
  );
}

export default Heading;
