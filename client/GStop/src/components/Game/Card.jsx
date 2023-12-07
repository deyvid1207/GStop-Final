import { useNavigate } from 'react-router-dom';
import '../styles/Card.css'
import '../styles/Popup.css'
import '../styles/responsive/ResponsiveCard.css'
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import API_URL from '../../utils/API_URL';
 

function Card(game) {
const navigate = useNavigate();
const [user, setUser] = useState();
const [count, setCount] = useState(game.Count ? game.Count : 0);
    //Authorization
    var RoleAuth = JSON.parse(localStorage.getItem('UserRole'));
     
   function getEdit(id) {
    localStorage.setItem('game-id', id)
    localStorage.setItem('game-location', 'shop')
    {navigate(`/edit?id=${game.Id}`,{state:{Id: game.Id, Name: game.Name, ImgURL: game.ImgURL, Description: game.Description, PublishedOn: game.PublishedOn.slice(0, 10), Price: game.Price}})}
 }
 useEffect(() => {
  setUser(JSON.parse(localStorage.getItem('currentUser')))
  
 }, [])
 function getDetails(id) {
 
  localStorage.setItem('game-id', id)
  navigate(`/details?id=${id}}`)
}
 
    return <>
    {game.Count > 0 ? (
 <div className="card"  >
 <img className="card-img-top" src={game.ImgURL}/>
 <div className="card-body">
 {game.Count > 0 ? (
          <p className='stock'><small> In Stock: {count}</small></p>
     ) : ( <p className='out-stock'> <small>Out of Stock </small></p>)}
  
     <p className='game-title-card'>{game.Name}</p>
     <p className='game-price'>Price: {game.Price.toFixed(2)}$</p>
  
  
     <div className='button-row'>
         <button onClick={() => getDetails(game.Id)}>View Details</button>
         
         {RoleAuth === 'Admin' ? ( 
          
           <div>  
             <button onClick={async () => { await fetch(`${API_URL}/api/game/add-game?id=${game.Id}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
              }
             })
             setCount(count + 1)
             
            }}
 
className='butplus'>+</button>  
            <button onClick={() => getEdit(game.Id)}>Edit</button> 
            
            <Popup  trigger= {<button>Delete</button>} position='top right'> 
            {close => ( 
                 <div className="popUp">
                   <h2>Are you certain you want to delete {game.Name}</h2>
                   <div className='confirm-buts'> 
                   <button className='confirm' onClick={async() => {
const deleteGame = await fetch(`${API_URL}/api/game/DeleteGame/${game.Id}`, {
 method: 'POST',
 headers: {
   'Accept': 'application/json',
   'Content-type': 'application/json'
 }
}) 
navigate("/deleteConfirm")


                   }}>Yes</button>
                   <button className='deny' onClick= 
                                   {() => close()}>No</button>
                   </div>
                 </div>
                 )}
            </Popup>
           </div>
        
          )
       :  <></>}
     </div>
 </div>
</div>
    )  : 
    <div className="card-disabled"  >
 <img className="card-img-top" src={game.ImgURL}/>
 <div className="card-body">
 {game.Count > 0 ? (
          <p className='stock'><small> In Stock: {count}</small></p>
     ) : ( <p className='out-stock'> <small>Out of Stock </small></p>)}
  
     <p className='game-title-card'>{game.Name}</p>
     <p className='game-price'>Price: {game.Price.toFixed(2)}$</p>
  
  
     <div className='button-row'>
         <button onClick={() => getDetails(game.Id)}>View Details</button>
         
         {RoleAuth === 'Admin' ? ( 
           <div>    
            <button onClick={() => getEdit(game.Id)}>Edit</button> 
            <button onClick={async () => await fetch(`${API_URL}/api/game/add-game?id=${game.Id}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
              }
             })}
>+</button>
            <Popup  trigger= {<button>Delete</button>} position='top right'> 
            {close => ( 
                 <div className="popUp">
                   <h2>Are you certain you want to delete {game.Name}</h2>
                   <div className='confirm-buts'> 
                   <button className='confirm' onClick={async() => {
const deleteGame = await fetch(`${API_URL}/api/game/DeleteGame/${game.Id}`, {
 method: 'POST',
 headers: {
   'Accept': 'application/json',
   'Content-type': 'application/json'
 }
}) 
 


                   }}>Yes</button>
                   <button className='deny' onClick= 
                                   {() => close()}>No</button>
                   </div>
                 </div>
                 )}
            </Popup>
           </div>
        
          )
       :  <></>}
     </div>
 </div>
</div>
    }
    
    </>
}
export default Card;