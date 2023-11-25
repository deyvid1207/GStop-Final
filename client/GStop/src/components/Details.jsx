import React, { useEffect, useState } from "react";
import API_URL from "../API_URL";

function Details() {
  const [game, setGame] = useState();

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(
          `${API_URL}/api/game/GetGame?id=${localStorage.getItem("game-id")}`,
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
          <img src={game.ImgURL} alt={game.Name} />
          <p>Published on: {game.PublishedOn.slice(0, 10)}</p>
        </div>
        <div className="right-div">
          <h2>{game.Description}</h2>
          <h2>{game.Price}$</h2>
          {game.Count >= 0 ? ( 
          <button>Purchase now!</button>
          ) : (
            <h1>Out of stock!</h1>
          )
        }
        </div>
      </div>
    </>
  );
}

export default Details;
