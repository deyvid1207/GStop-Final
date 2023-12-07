import { useEffect, useState } from "react";
import API_URL from "../../utils/API_URL";

 

function Comment(com, gameId) {

   
   
  
 
    
    return  <div className="comment-row">
    <div className="comment-col">
      <h3 className="comment-user">{com.Username}</h3>
<p className="Content">{com.Content}</p>
<p className="Time">{com.PublishedOn .slice(11).slice(0,8)}</p>
</div>
{com.Username === JSON.parse(localStorage.getItem('currentUser')).UserName || JSON.parse(localStorage.getItem("UserRole")) === "Admin"? (

<button className="commentButton" onClick={async () => {
 const remove = await fetch(`${API_URL}/api/game/remove-comment?id=${JSON.parse(localStorage.getItem('game-id'))}&commentId=${com.Id}`, {
 method: "POST",
 headers: {
   Accept: "application/json",
   "Content-type": "application/json",
 }});
 if(remove.ok) {
  window.location.reload();
 }


}}> Delete Comment</button>
): <></>} 
   </div>
}
export default Comment;