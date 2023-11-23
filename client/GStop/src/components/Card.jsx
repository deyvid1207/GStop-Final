import './styles/Card.css'
function Card(game) {

    //Authorization
    var RoleAuth = JSON.parse(localStorage.getItem('UserRole'));

    
    return <>
    <div className="card"  >
  <img className="card-img-top" src={game.ImgURL}/>
  <div className="card-body">
      <p className='game-title-card'>{game.Name}</p>
      <p className='game-price'>Price: {game.Price}$</p>
      <p className='game-Quantity'>Available:{game.Count}</p>
      <div className='button-row'>
          <button>View Details</button>
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