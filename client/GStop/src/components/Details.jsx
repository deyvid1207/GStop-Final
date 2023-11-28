import React, { useEffect, useState } from "react";
import API_URL from "../API_URL";
import './styles/Details.css'

function Details() {
  const [game, setGame] = useState();

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(
          `${API_URL}/api/game/GetGame/${localStorage.getItem("game-id")}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }

        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    }

    fetchGame();
  }, []);

  if (!game) {
    // Render a loading state or return null if game is not available yet
    return null;
  }

  return (
    <>
      <div className="details-pg">
        <div className="left-div">
          <h1 className="d-game-title">{game.Name}</h1>
          <img className="d-game-img" src={game.ImgURL} alt={game.Name} />
          <p className="d-game-po" >Published on: {game.PublishedOn.slice(0, 10)}</p>
        </div>
        <div className="right-div">
          <h2 className="d-game-desc">{game.Description}</h2>
          {game.Count > 0 ? (


<h2 className="d-game-price">Get now for: {game.Price}$</h2>
          ) : (

            <h2 className="d-game-price">Out of stock</h2>
          )}
         
          <div className="d-game-button-rows">
            <button className="d-game-button">Purchase now!</button>
          </div>
          <div className="comment-div">
            <h2>Comments:</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
