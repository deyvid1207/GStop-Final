
import React, { useState, useEffect } from "react";
import API_URL from "../API_URL";
import { useNavigate } from "react-router-dom";
API_URL
function Shop() {
      const navigate = useNavigate();
      const [games, setGames] = useState([]);
      useEffect(() => {
        // Fetch the list of games when the component mounts
        fetchGames();
      }, []);
      //Authentication
      var check = JSON.parse(localStorage.getItem('currentUser'));   
      //Authorization
      var RoleAuth = JSON.parse(localStorage.getItem('UserRole'));
       
      const fetchGames = async () => {

        try {
          // Replace the URL with the actual endpoint for your games
          const response = await fetch(`${API_URL}/api/game/GetAllGames`);
          const data = await response.json();
          console.log(data)
          setGames(data);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      };
        
      return (
        <div>
          <h1>List of Games</h1>
          <ul>
            {games.map((game) => (
              <h1 key={game.id}>{game.Name}</h1>
            ))}
          </ul>
          {RoleAuth === 'Admin' ? (
           <>  <button onClick={() => navigate("/addGame")}>Add Game</button></>
          ) : (<></>)  }
         
        </div>
      );
   

}
export default Shop;