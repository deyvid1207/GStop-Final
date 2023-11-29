import { useNavigate } from 'react-router-dom';
import './styles/Card.css'
 
function Card(game) {
const navigate = useNavigate();
    //Authorization
    var RoleAuth = JSON.parse(localStorage.getItem('UserRole'));
    function getDetails(id) {
      localStorage.setItem('game-id', id)
      navigate(`/details?id=${id}}`)
   }
    
    return <>
    <div className="card"  >
  <img className="card-img-top" src={game.ImgURL}/>
  <div className="card-body">
      <p className='game-title-card'>{game.Name}</p>
      <p className='game-price'>Price: {game.Price.toFixed(2)}$</p>
      <p className='game-Quantity'>Available:{game.Count}</p>
      <div className='button-row'>
          <button onClick={() => getDetails(game.Id)}>View Details</button>
          <button>Buy</button>
          {RoleAuth === 'Admin' ? 
           <button>Edit</button>
        
        : <></>}
      </div>
  </div>
</div>
    </>
}
export default Card;