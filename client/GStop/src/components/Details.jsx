import { useEffect, useState } from "react";
import API_URL from "../API_URL";

function Details(id) 
{
    
const [game, setGame] = useState();
    const fetchData = async () => {
try {
const response = await fetch(`${API_URL}/api/game/GetGame?id=${localStorage.getItem('game-id')}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
   

}).then(r => r.json());

console.log(response)
setGame(response);
}
catch {

}
fetchData();
console.log(game)
}
}
export default Details;