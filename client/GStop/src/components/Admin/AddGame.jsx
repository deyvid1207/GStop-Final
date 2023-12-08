import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/API_URL";
import { useAuth } from "../../utils/AuthenticationCheck";
import '../styles/AddGame.css'
 
 
function AddGame() {
  const navigate = useNavigate();
    useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ImgURL, setImgURL] = useState('');
    const [Price, setPrice] = useState('');

  
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

      async function createGame(e) {
        e.preventDefault();
        try {
        const response = await fetch(`${API_URL}/api/game/CreateGame`, {
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
            }), 
          });
       
        }
        catch (error) {
          console.log(error)
        }
        navigate("/shop")
      }
    return <>
    <div className="add-pg"> 
       <form onSubmit={createGame}>
        <div className="form-div">
          <label className="label1">Game Title</label>
          <input placeholder="Game Title" onChange={handleName} className="input" value={name} type="text" />

          <label className="label1">Description</label>
          <input placeholder="Description" type="text" onChange={handleDescription} className="input" value={description} />

          <label className="label1">ImgURL</label>
          <input placeholder="ImgURL" onChange={handleImgURL} className="input" value={ImgURL}   />
          <label className="label">Price</label>
          <input placeholder="Price" onChange={handlePrice} type="number"  value={Price} />
          <button type="submit" className="createButton">Create</button>
        </div>
        
      </form>
      </div>
    </>

}
export default AddGame;