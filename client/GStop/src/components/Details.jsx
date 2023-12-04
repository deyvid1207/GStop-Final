import React, { useEffect, useState } from "react";
import API_URL from "../API_URL";
import './styles/Details.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthenticationCheck";
 
function Details() {
  const [game, setGame] = useState();
  const [user, setUser] = useState();
  const [money, setMoney] = useState(0); 
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchGame() {
       setUser(JSON.parse(localStorage.getItem('currentUser')))
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

  
   async function BuyGame() {
    console.log(user);
    const response = await fetch(`${API_URL}/api/game/PurchaseGame/${game.Id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user.UserName),
    });
    if(response.ok) {
    const newMoney = user.Money - game.Price;
    setMoney(newMoney);

    // Update user's money in localStorage
    const updatedUser = { ...user, Money: newMoney };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    navigate("/")
    window.location.reload();
   } }

   async function LikeGame() {
    const response = await fetch(`${API_URL}/api/game/LikeGame/${game.Id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user.UserName),
    });
   
    window.location.reload();
   }

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
          <div className="d-game-button-rows">
          {game.Count > 0 ? (

    
<h2 className="d-game-price">Get now for: {game.Price.toFixed(2)}$</h2>
 
          ) : (

            <h2 className="d-game-price">Out of stock</h2>
          )}
         
          {JSON.parse(localStorage.getItem('UserRole')) !== 'Admin' ? ( 
            <button className="d-game-button" onClick={BuyGame}>Purchase now!</button>) : ( 
     
         <button onClick= {() => {navigate(`/edit?id=${game.Id}`,{state:{Id: game.Id, Name: game.Name, ImgURL: game.ImgURL, Description: game.Description, PublishedOn: game.PublishedOn.slice(0, 10), Price: game.Price}})}}className="d-game-button">Edit Game</button>)
       
     
          }
            <button className="like-btn" onClick={LikeGame}> 
            <svg className="likeSVG"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 486.926 486.926" xml:space="preserve">  
<g>
  
	<path d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4   c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7   c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9   c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z    M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7   v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9   c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24   c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9   h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z"/>

</g>
 
</svg></button>
<h2 className="d-game-like">Likes: {game.Likes.length}</h2>
          </div>
          <div className="comment-div">
            <h2 className="comment-Title">Comments:</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
