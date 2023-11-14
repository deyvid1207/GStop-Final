using GStop.Core.Services;
using GStop.Core.Services.Contacts;
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
        public GameController(IGameServices gameServices) 
        { 
          this._gameServices = gameServices;
        
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
        //Read

        [HttpGet("GetAllGames")]

        public async Task<List<Game>> GetAllGames()
        {

            List<Game> games = await _gameServices.GetAllGames();
            return games;
           

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
        public async Task<IActionResult> EditGame(int id, UpdateGameDTO updateGameDTO )
        {
            var game = await _gameServices.FindGameAsync(id);

            await _gameServices.EditGameAsync(game, updateGameDTO);
           return Ok(game);
            

        }
        //Delete
        [HttpPost("DeleteGame")]
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

        [HttpPost("LikeGame")]
        public async Task<IActionResult> LikeGame(int id)
        {
            string userName = HttpContext.User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                // Handle the case where the user's name is not available
                return BadRequest("User name not found.");
            }

            await _gameServices.LikeGame(id, userName);
            return StatusCode(200);

        }
    }
}
