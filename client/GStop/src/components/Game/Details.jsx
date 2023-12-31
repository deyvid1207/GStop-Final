import React, { useEffect, useState } from "react";
import API_URL from "../../utils/API_URL";
import '../styles/Details.css'
import '../styles/responsive/ResponsiveDetails.css'
import {  useNavigate } from "react-router-dom";

 import Comment from "./Comment";
function Details() {
  const [game, setGame] = useState();
  const [user, setUser] = useState();
  const [money, setMoney] = useState(0); 
  const [likes, setLikes] = useState(game && game.Likes ? game.Likes.length : 0);

  const [currentPage, setCurrent] = useState(1); 
  const [commentsperPage, setcomments] = useState([]); 
  const [allcomments, setAllComments] = useState([]); 
  const [comment, setComment] = useState(""); 
 
  const navigate = useNavigate()
  const handlecomment = (e) => {
    setComment(e.target.value);
  };
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
     
       
        const commentsrs = await fetch(
          `${API_URL}/api/game/get-comments?id=${localStorage.getItem("game-id")}&currentPage=${currentPage}`,
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
        const commentsall = await fetch(
          `${API_URL}/api/game/get-all-comments?id=${localStorage.getItem("game-id")}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if(commentsall.ok && commentsrs.ok) { 
        const commentData = await commentsrs.json();
   
        const AllcommentData = await commentsall.json();
        setAllComments(AllcommentData);
     
        setcomments(commentData);
      }
      setGame(data);
   
      setLikes(data.Likes.length);
     
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    }

    fetchGame();
  }, [currentPage]);

  
   async function BuyGame() {
  
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
   }
  else{
    alert(`You don't have enough money to purchase ${game.Name}`)
  } }
  
  const handleDeleteComment = async (commentId) => {
    // Update comment
    const updatedComments = commentsperPage.comments.filter((comment) => comment.Id !== commentId);
    setcomments({ ...commentsperPage, comments: updatedComments });
  };
  async function LikeGame() {
    const response = await fetch(`${API_URL}/api/game/LikeGame/${game.Id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user.UserName),
    });
  
    // Update likes 
    const updatedGameResponse = await fetch(
      `${API_URL}/api/game/GetGame/${localStorage.getItem("game-id")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
  
    if (response.ok && updatedGameResponse.ok) {
   
      const updatedGameData = await updatedGameResponse.json();
      setLikes(updatedGameData.Likes.length);
    }
  }
  
   async function addComment() {
    if(comment !== "") {  
    try {
      const response = await fetch(`${API_URL}/api/game/comment-game/${localStorage.getItem("game-id")}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Username: user.UserName,
          GameId: game.Id,
          Content: comment,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.status}`);
      }
  
      const responseData = await response.json();
   
      

      window.location.reload();

      setcomments((prevComments) => [...prevComments, responseData]);
  
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }
  }
  

  if (!game) {
 
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

    <> 
<h2 className="d-game-price">Get now for: {game.Price.toFixed(2)}$</h2>
    <button className="d-game-button" onClick={BuyGame}><h3>Purchase now</h3></button>)
    </>   ) : (
 <> 
            <h2 className="d-game-price">Out of stock</h2>
            <button className="d-game-button" onClick={BuyGame}disabled>  <h3>Not Available</h3></button>
            </>
          )}

            {JSON.parse(localStorage.getItem('UserRole')) === 'Admin' ? ( 
     
              
 
         <button onClick= {() => {navigate(`/edit?id=${game.Id}`,{state:{Id: game.Id, Name: game.Name, ImgURL: game.ImgURL, Description: game.Description, PublishedOn: game.PublishedOn.slice(0, 10), Price: game.Price}})}}className="d-game-button">Edit Game</button>
   ) : <></>  }
        
            <button className="like-btn" onClick={LikeGame}> 
            <svg className="likeSVG"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 486.926 486.926" xml:space="preserve">  
<g>
  
	<path d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4   c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7   c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9   c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z    M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7   v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9   c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24   c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9   h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z"/>

</g>
 
</svg></button>
<h2 className="d-game-like">Likes: {likes}</h2>
          </div>
          <div className="comment-div">
            <div className="comment-data-div"> 
            <h2 className="comment-Title">Comments:</h2>
                 {commentsperPage.comments.map((com) => (
                       <Comment key={com.Id} onDeleteComment={handleDeleteComment} {...com} />
                 ))}
                    
                 </div>
               
                 <form className="comment-form" onSubmit={addComment}> 
                 <div className="comment-form"> 
                 <input className="comment-bar" type="text" onChange={handlecomment} value={comment} placeholder="Comment..." /> 
                 <button type="submit" className="comment-Button">Add Comment</button>
                 </div>
                 </form>
                 <div className="Pages">
                 <p>Page: {currentPage} out of {commentsperPage.Pages === 0 ? (<>1</>) : (<>{commentsperPage.Pages}</>)}</p>
                 <p>Total Comments: {allcomments.comments.length}</p>
                 <div className="Page-but"> 
                  <button className="Page-but-1" onClick={() => {
                    var newPage = currentPage - 1;
                    if(newPage <= 0) {
                      newPage = 1;

                    }
                    setCurrent(newPage)
                     
                  }} > &#8592;</button>
                
                  <button className="Page-but-1" onClick={() => {
                    var newPage = currentPage + 1;
                 
                    
                    if(newPage > commentsperPage.Pages) {
                    
                      newPage = commentsperPage.Pages ;
                    
                      if(commentsperPage.Pages === 0) {
                     newPage = 1;
                      }
                      

                    }
                    setCurrent(newPage)
                      
                  }} > &#8594;</button>
                  </div>  
                 </div>
               
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
