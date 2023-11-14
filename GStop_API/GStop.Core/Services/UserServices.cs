using GStop_API.Data.Models.Games;
using Microsoft.AspNetCore.Identity;
using GStop_API.Data;
using GStop_API.Data.Models;
using Microsoft.EntityFrameworkCore;
using GStop.Core.Services.Contacts;

namespace GStop_API.Services
{
    public class UserServices : IUserServices
    {
        private readonly GStopDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserServices(GStopDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            this._dbContext = dbContext;
            this._userManager = userManager;
        }
        public async Task<ApplicationUser> GetUserByUsername(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            return user;
        }
        public async Task<ApplicationUser> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user;
        }
        public async Task<ApplicationUser> GetUserById(Guid Id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == Id);
            return user;
        }
    }
}
