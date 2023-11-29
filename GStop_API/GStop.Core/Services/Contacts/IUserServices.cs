using GStop_API.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GStop.Core.Services.Contacts
{
    public interface IUserServices
    {
        public Task<ApplicationUser> GetUserByUsername(string username);
        public Task<ApplicationUser> GetUserByEmail(string email);
        public Task<ApplicationUser> GetUserById(Guid Id);
        public Task<ApplicationUser> SetCurrentUser(string username);
        public Task AddMoney(Guid Id);

    }
}
