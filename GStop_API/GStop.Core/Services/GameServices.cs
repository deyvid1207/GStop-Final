using GStop_API.Data.Models;
using GStop_API.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GStop.Core.Services.Contacts;
using System.Security.Cryptography.X509Certificates;
using GStop_API.DTOs.GameDTOs;
using GStop_API.Data.Models.Games;
using GStop.DTOs.DTOs.GameDTOs;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;

namespace GStop.Core.Services
{
    public class GameServices : IGameServices

    {
        private readonly GStopDbContext _dbContext;
 
        public GameServices(GStopDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<List<Game>> GetAllGames()
        {
            List<Game> games = await _dbContext.Games.ToListAsync();

            return games;
        }
        public async Task CreateGameAsync(Game model)
        {
            var gm = await _dbContext.Games.Include(x => x.Likes).Include(x => x.Comments).ThenInclude(x => x.Publisher).FirstOrDefaultAsync(x => x.Name == model.Name);
            if (model == null)
            {
                throw new Exception("Game is null, please enter it correct!");

            }
            if (gm!= null)
            {
                gm.Count++;
            }
            else
            {


                var game = new Game()
                {
                    Name = model.Name,
                    Description = model.Description,
                    Count = model.Count,
                    Price = model.Price,
                    PublishedOn = model.PublishedOn,
                    ImgURL = model.ImgURL,

                };
                await _dbContext.Games.AddAsync(game);
            }

         
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteGameAsync(int id)
        {
            var game = await FindGameAsync(id);
            if (game.Count == 1)
            {
                 _dbContext.Remove(game);
            }
            else
            {
                game.Count--;
            }
            await _dbContext.SaveChangesAsync();
        }
        public async Task<Game> FindGameAsync(int id)
        {

            var game = await _dbContext.Games.Include(x => x.Likes).Include(x => x.Comments).ThenInclude(x => x.Publisher).FirstOrDefaultAsync(x => x.Id == id);

            return game;
             
        }
        public async Task<int> GetGameCount(int id)
        {

            var game = await _dbContext.Games.FirstOrDefaultAsync(x => x.Id == id);
            int count;
            if (game == null)
            {
                count = 1;
            }
            else
            {
                count = game.Count;
            }
             
            
            return count;

        }

        public async Task EditGameAsync(Game game, UpdateGameDTO updateGameDTO)
        {
            game.Name = updateGameDTO.Name;
            game.Description = updateGameDTO.Description;
            game.Price = updateGameDTO.Price;
            game.ImgURL = updateGameDTO.ImgURL;
            await _dbContext.SaveChangesAsync();
        }
        public async Task LikeGame(int Id, string username)
        {
            
            var game = await _dbContext.Games.Include(x => x.Likes).ThenInclude(x => x.User).FirstOrDefaultAsync(x => x.Id == Id);
            if (game != null)
            {

             
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
            {

            }
            else if (game.Likes.FirstOrDefault(x => x.UserId == user.Id) == null)
            {
                    Like Like = new Like()
                    {
                      GameId = game.Id,
                        Game = game,
                        User = user,
                        LikedOn = DateTime.Now,
                        UserId = user.Id
                    };
                 game.Likes.Add(Like);
            }
                else
                {
                    var Like = game.Likes.FirstOrDefault(x => x.UserId == user.Id);
                    game.Likes.Remove(Like);
                }
            }
            await _dbContext.SaveChangesAsync();
        }
        public List<Game> SearchAsync(string search)
        {
            var d = new List<Game>();

            if (search == null)
            {
                d = _dbContext.Games.ToList();
            }
            else
            {
                d = _dbContext.Games.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();

            }

            return d;

        }
        public async Task<bool> BuyGame(int Id, string username)
        {
            var game = await _dbContext.Games.FirstOrDefaultAsync(x => x.Id == Id);
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            var comments = new List<Comment>();
            if (user == null || game == null)
            {
                return false;
            }
            if (user.Money >= game.Price)
            {
                user.Money -= game.Price;
                game.Count--;
                if (game.Count == 0)
                {
                    comments = game.Comments.ToList();
                    _dbContext.Games.Remove(game);
                    _dbContext.Comments.RemoveRange(comments);
                }
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                 
                return false;
                 
            }
            


        }

        public async Task<bool> AddComment(Game game, Comment comment, string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null || game == null || comment == null)
            {
                return false;

            }
            else
            {

                await _dbContext.Comments.AddAsync(comment);
                game.Comments.Add(comment);
            }
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<GameComments> GetComments(Game game, int curpage)
        {
            var comments = await _dbContext.Comments.ToListAsync();
            var gameCommentsDto = new GameComments
            {

                GameId = game.Id,
                Pages =  (int)Math.Ceiling((decimal)comments.Count / 7),
                Page = curpage,
                comments = await _dbContext.Comments.Where(x => x.Game == game).Skip((curpage - 1) * 7).Take(7).Select(x => new UserCommentDTO
                {
                    Id = x.Id,
                    Content = x.Content,
                    Username = x.Publisher.UserName,
                    PublishedOn = x.PublishedOn,

                }).ToListAsync()
               
            };
            return gameCommentsDto;
          
        }

        public async Task<bool> RemoveComment(Game game, int commentId)
        {
            var Comment = game.Comments.FirstOrDefault(x => x.Id == commentId);
            if (Comment == null)
            {
                return false;
            }
          
            game.Comments.Remove(Comment);
            _dbContext.Comments.Remove(Comment);
            await _dbContext.SaveChangesAsync();
            return true; 
            
        }
    }
}
