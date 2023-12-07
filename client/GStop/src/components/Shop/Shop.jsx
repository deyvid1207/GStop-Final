import React, { useState, useEffect } from "react";
import API_URL from "../../utils/API_URL";
import { useNavigate } from "react-router-dom";
import '../styles/Shop.css';
import Card from "../Game/Card";

function Shop() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [game, setRandomGame] = useState([]);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState(0);
  const handleSearch = (e) => {
    setSearch(e.target.value);
   
  } ;
  
  console.log(search);
  useEffect(() => {
    const fetchData = async () => {
      //Authentication
    
      var check = JSON.parse(localStorage.getItem('currentUser'));   
      //Authorization
      
       console.log(search)
       console.log(check)
  
      if (check === null) {
        navigate("/register");
        return;
      }
    
      if  (search === '' ) { 
      try {
        // Replace the URL with the actual endpoint for your games
        const response = await fetch(`${API_URL}/api/game/GetAllGames`);
        const data = await response.json();
        setLength(data.length);
        console.log(data);
        setGames(data);
  
        const availableGames = data.filter(game => game.Count > 0);
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        const avgame =  availableGames[randomIndex];
        setRandomGame(avgame);
        setPrice(avgame.Price);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    else {
      try {

        console.log(search)
        // Replace the URL with the actual endpoint for your games
        const response = await fetch(`${API_URL}/api/game/searchGame?input=${search}`, {

          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },

        });
        const data = await response.json();
  if(data)
        console.log(data);
        setGames(data);
      
       console.log(price)
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    };
  
    fetchData();
  }, [search]);
    function getDetails(id) {
       localStorage.setItem('game-id', id)
     
       navigate(`/details?id=${id}`)
    }
   
  return (
   
    <div className="page">
      {length > 0 ?  ( 
      <div className="game-of-the-week">
        <h1 className="GOTW-Title">Highlighted game</h1>
        <div className="game" key={game.Id}>

          <div className="game-head">
              <h3 className="game-title">{game.Name}</h3>
              <img className="game-img" src={game.ImgURL}/>
          </div>
          <div className="game-content">
          <h3 className="game-desc">{game.Description}</h3>
          <h3 className="game-price-1">Get now for {price.toFixed(2)}$</h3>
          <button className="game-dets" key={game.Id} onClick={() => getDetails(game.Id)}value={game.id}>Details</button>
            </div>
            
        </div>
      </div>
        ) : <></>  } 
      <div className="searchBar-div">
        <form> 
          <input className="searchBar" onChange={handleSearch} type="text" value={search} placeholder="Search..." /> 
          </form>
        </div>  
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="icon"fill="#000000" height="2em" width="3em" version="1.1" id="Capa_1" viewBox="0 0 488.4 488.4" xml:space="preserve">
<g>
	<g>
		<path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z"/>
	</g>
</g>
</svg>
      <ul className="games">
       {games.length > 0 ? ( 
        games.map((game) => (
          <Card key={game.Id} {...game} />
        ))) : (


          <><div className="no-game">
            <img className="image" src="https://assets.materialup.com/uploads/b17ea0c7-df76-4ce1-bf82-4a2cf6ae866d/preview.jpg"/>
            <h2 className="ng-Title">No games found</h2>
            </div></>
        )
      
      
      }
        
      </ul>

      {JSON.parse(localStorage.getItem('UserRole')) === 'Admin' ? (
        <button onClick={() => navigate("/addGame")}>Add Game</button>
      ) : null}
    </div>
  );
}

export default Shop;
