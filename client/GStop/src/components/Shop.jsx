import React, { useState, useEffect } from "react";
import API_URL from "../API_URL";
import { useNavigate } from "react-router-dom";
import './styles/Shop.css';
import Card from "./Card";

function Shop() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [game, setRandomGame] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      //Authentication
      var check = JSON.parse(localStorage.getItem('currentUser'));   
      //Authorization
      
       
  
      if (check === null) {
        navigate("/register");
        return;
      }
  
      try {
        // Replace the URL with the actual endpoint for your games
        const response = await fetch(`${API_URL}/api/game/GetAllGames`);
        const data = await response.json();
  
        console.log(data);
        setGames(data);
  
        const availableGames = data.filter(game => game.Count > 0);
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        const avgame =  availableGames[randomIndex];
        setRandomGame(avgame);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="game-of-the-week">
        <h1 className="GOTW-Title">Game of the week</h1>
        <div className="game">

          <div className="game-head">
              <h3 className="game-title">{game.Name}</h3>
              <img className="game-img" src={game.ImgURL}/>
          </div>
          <div className="game-content">
          <h3 className="game-desc">{game.Description}</h3>
          <h3 className="game-price-1">Get now for {game.Price}$</h3>
          <button className="game-dets">Details</button >
            </div>
          
        </div>
      </div>

      <ul className="games">
        {games.map((game) => (
          <Card key={game.Id} {...game} />
        ))}
      </ul>

      {JSON.parse(localStorage.getItem('UserRole')) === 'Admin' ? (
        <button onClick={() => navigate("/addGame")}>Add Game</button>
      ) : null}
    </div>
  );
}

export default Shop;
