using GStop.Core.Services.Contacts;
using GStop.DTOs.DTOs.GameDTOs;
using GStop_API.Data.Models;
using GStop_API.Data.Models.Games;
using GStop_API.DTOs.GameDTOs;
using GStop_API.DTOs.UserDTOs;
using Microsoft.AspNetCore.Mvc;

namespace GStop_API.Controllers
{

    [ApiController]
    [Route("api/game")]
    public class GameController : Controller
    {
        private IGameServices _gameServices { get; set; }
        private IUserServices _userServices { get; set; }
        public GameController(IGameServices gameServices, IUserServices userServices)
        {
            this._gameServices = gameServices;
            this._userServices = userServices;

        }
        //Create 
        [HttpPost("CreateGame")]
        public async Task<IActionResult> CreateGame([FromBody] GameCreateDTO gameCreateDTO)
        {
            if (gameCreateDTO == null || !ModelState.IsValid)
                return BadRequest();
            var game = new Game
            {
                Name = gameCreateDTO.Name,
                Description = gameCreateDTO.Description,
                Count = 1,
                ImgURL = gameCreateDTO.ImgURL,
                Price = gameCreateDTO.Price,
                PublishedOn = gameCreateDTO.PublishedOn

            };
            await _gameServices.CreateGameAsync(game);
            return Ok(game);

        }
        [HttpPost("add-game")]
        public async Task<IActionResult> AddGame(int id)
        {
            var game = await _gameServices.FindGameAsync(id);
            await _gameServices.AddGame(game);
            return Ok();
        }
    
        //Read

        [HttpGet("GetAllGamesSortedByLikes")]

        public async Task<IActionResult> GetAllGames()
        {

            List<Game> games = await _gameServices.GetAllGamesByLikes();
            return Ok(games);
           

        }
        [HttpGet("GetAllGamesSortedByPrice")]

        public async Task<IActionResult> GetAllGamesPrice()
        {

            List<Game> games = await _gameServices.GetAllGamesByPrice();
            return Ok(games);


        }
        [HttpGet("GetAllGamesSortedByCount")]

        public async Task<IActionResult> GetAllGamesCount()
        {

            List<Game> games = await _gameServices.GetAllGamesByCount();
            return Ok(games);


        }
        [HttpGet("searchGame/{input}")]
        public  IActionResult SearchGame(string input)
        {
            List<Game> games =  _gameServices.SearchAsync(input);
            return Ok(games);
        }
        //Read

        [HttpGet("GetGame/{id}")]

        public async Task<IActionResult> GetGame(int id)
        {
            
            var game = await _gameServices.FindGameAsync(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);


        }
        //Update
        [HttpPost("EditGame/{id}")]
        public async Task<IActionResult> EditGame(int id,[FromBody] UpdateGameDTO updateGameDTO )
        {
            var game = await _gameServices.FindGameAsync(id);

            await _gameServices.EditGameAsync(game, updateGameDTO);
           return Ok(game);
            

        }
        //Delete
        [HttpPost("DeleteGame/{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            await _gameServices.DeleteGameAsync(id);
            return StatusCode(200);

        }
        [HttpGet("SearchGame")]
        public IActionResult Search(string input)
        {

            var selected = _gameServices.SearchAsync(input);
            return Ok(selected);
        }

        [HttpPost("LikeGame/{id}")]
        public async Task<IActionResult> LikeGame(int id, [FromBody] string username)
        {
  
            if (string.IsNullOrEmpty(username))
            {
                // Handle the case where the user's name is not available
                return BadRequest("User name not found.");
            }

            await _gameServices.LikeGame(id, username);
            return StatusCode(200);

        }
        [HttpPost("PurchaseGame/{id}")]
        public async Task<IActionResult> PurchaseGame(int id, [FromBody]string username)
        {

            if(await _gameServices.BuyGame(id, username))
            {

         
             
            return StatusCode(201);
            }
            return BadRequest();
        }
        [HttpPost("comment-game/{id}")]
        public async Task<IActionResult> CommentGame(int id, [FromBody] UserCommentDTO userComment)
        {

            var game = await _gameServices.FindGameAsync(id);
            var user = await _userServices.GetUserByUsername(userComment.Username);
            var Comment = new Comment()
            {
                PublishedOn = DateTime.Now,
                Content = userComment.Content,
                Publisher =user,
                PublisherId = user.Id,
                Game = game,
                GameId = game.Id,
            };
            if (await _gameServices.AddComment(game, Comment, userComment.Username))
            {

                return StatusCode(201);
            }
            return BadRequest();


        }
        [HttpGet("get-comments")]
        public async Task<IActionResult> GetComments(int id, int currentPage)
        { 
            var game = await _gameServices.FindGameAsync(id);
    
            var games = await _gameServices.GetComments(game, currentPage);
                return Ok(games); 
  


        }
        [HttpGet("get-all-comments")]
        public async Task<IActionResult> GetAllComments(int id)
        {
            var game = await _gameServices.FindGameAsync(id);

            var games = await _gameServices.GetAllComments(game);
            if(games == null)
            {
                return Ok();
            }
            return Ok(games);



        }
        [HttpPost("remove-comment")]
    public async Task<IActionResult> RemoveComment(int id, int commentId)
    {
            var game = await _gameServices.FindGameAsync(id);

            if (await _gameServices.RemoveComment(game, commentId)) 
            {

                return StatusCode(201);
            }
            return BadRequest();



        }
}
}
