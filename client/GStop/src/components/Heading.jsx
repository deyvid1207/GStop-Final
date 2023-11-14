import { useEffect, useState } from "react";
import './styles/Heading.css'; 
import './styles/responsive/ResponsiveHeading.css'; 
import { Link } from "react-router-dom";

function Heading() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://127.0.0.1:7293/api/game/GetAllGames`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setGames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
       <header>
        <div className="header"> 
        <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/games">All Games</Link></li>
           <h3 className="Title"><Link to="/">GStop</Link></h3>
           <li className="right"><Link to="/register">Register</Link></li>
           <li className="last"><Link to="/login">Login</Link></li>
        </ul>
        </div>
       </header>
    </div>
  );
}

export default Heading;
