
import React, { useState, useEffect } from "react";
import API_URL from "../API_URL";
import { useNavigate } from "react-router-dom";
 
import './styles/Shop.css'
import Card from "./Card";
API_URL
function Shop() {
      const navigate = useNavigate();
      const [games, setGames] = useState([]);
      const [game, setrandomGame] = useState([]);
      useEffect(() => {
        // Fetch the list of games when the component mounts
        fetchGames();
      }, []);
      //Authentication
      var check = JSON.parse(localStorage.getItem('currentUser'));   
      //Authorization
      var RoleAuth = JSON.parse(localStorage.getItem('UserRole'));
       if(check === null) {
        navigate("/register");
       }
     
      const fetchGames = async () => {

        try {
          // Replace the URL with the actual endpoint for your games
          const response = await fetch(`${API_URL}/api/game/GetAllGames`);
          const data = await response.json();
        
          console.log(data)
          setGames(data);
          const availableGames = data.filter(game => game.Count > 0);
          const randomIndex = Math.floor(Math.random() * data.length);
          const game =  availableGames[randomIndex];
          setrandomGame(game)
        } catch (error) {
          console.error("Error fetching games:", error);
        }
       
     
      };
        
      return (
        <div className="page">
          
          <div className="game-of-the-week">
            <h1 className="Title">Game of the week</h1>
           
          </div>


     
          <ul className="games">
            {games.map((game) => (
              <Card key={game.Id} ${...game}/>
            ))}
          </ul>
          {RoleAuth === 'Admin' ? (
           <>  <button onClick={() => navigate("/addGame")}>Add Game</button></>
          ) : (<></>)  }
         
        </div>
      );
   

}
export default Shop;