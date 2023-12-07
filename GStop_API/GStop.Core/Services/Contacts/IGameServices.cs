using GStop.DTOs.DTOs.GameDTOs;
using GStop_API.Data.Models;
using GStop_API.DTOs.GameDTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GStop.Core.Services.Contacts
{
    public interface IGameServices
    {
        public  Task CreateGameAsync(Game model);
        public  Task DeleteGameAsync(int id);
        public  Task EditGameAsync(Game game, UpdateGameDTO updateGameDTO);
        public Task AddGame(Game model);
        public Task<List<Game>> GetAllGames();
        public Task<List<Game>> GetAllGamesByCount();

        public Task<List<Game>> GetAllGamesByPrice();


        public Task<List<Game>> GetAllGamesByLikes();
        public  Task<Game> FindGameAsync(int id);
        public Task<bool> BuyGame(int Id, string username);

        public  Task<int> GetGameCount(int id);
        public  Task LikeGame(int Id, string username);

        public List<Game> SearchAsync(string input);
        public Task<bool> AddComment(Game game, Comment comment, string username);
        public Task<GameComments> GetComments(Game game, int curpage);
        public Task<GameComments> GetAllComments(Game game);
        public Task<bool> RemoveComment(Game game, int commentId);
         

    }
}
