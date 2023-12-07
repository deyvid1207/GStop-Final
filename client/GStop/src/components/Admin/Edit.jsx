import React, { useEffect, useState } from "react";
import API_URL from "../../utils/API_URL";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthenticationCheck";
 function Edit() {
    useAuth();  
    const location = useLocation();
    const navigate = useNavigate();
   
     
 
    const [name, setName] = useState(location.state?.Name || '');
    const [description, setDescription] = useState(location.state?.Description || '');
    const [ImgURL, setImgURL] = useState(location.state?.ImgURL || '');
    const [Price, setPrice] = useState(location.state?.Price || '');
    
  
    const handleName = (e) => {
        setName(e.target.value);
      };
    const handleDescription = (e) => {
        setDescription(e.target.value);
      };

    const handleImgURL = (e) => {
        setImgURL(e.target.value);
      };
    const handlePrice = (e) => {
        setPrice(e.target.value);
      };
    
console.log(location)
 async function editGame(e) {
    e.preventDefault();
    const editgame = await fetch(`${API_URL}/api/game/EditGame/${location.state.Id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          imgURL: ImgURL,
          description: description,
          price: Price,
        })      
      }).then(j => j.json()).then();
      if(localStorage.getItem('game-location') === 'shop') {
        navigate(`/shop`)
       }
       else {
        navigate(`/details?id=${location.state.Id}`);
       }
     
  }
  
    return <>   
    <form onSubmit={editGame}> 
      <label  className="label1">Game Title</label>
    <input placeholder="Game Title" onChange={handleName}  className="input" value={name} type="text" />

    <label className="label1">Description</label>
    <input placeholder="Description" type="text"  onChange={handleDescription} className="input" value={description} />

    <label className="label1">ImgURL</label>
    <input placeholder="ImgURL" onChange={handleImgURL}  className="input" value={ImgURL}   />
    <label className="label">Price</label>
    <input placeholder="Price" onChange={handlePrice}    type="number"  value={Price} />
    <button type="submit" className="createButton">Create</button>
    </form>
    </>
}
export default  Edit;