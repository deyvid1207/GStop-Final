using GStop_API.Data.Models;
using GStop_API.Data.Models.Games;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GStop_API.Data
{
    public class GStopDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
         public DbSet<Game> Games { get; set; } = null!;
         public DbSet<Like> Likes { get; set; } = null!;
         public DbSet<Comment> Comments { get; set; } = null!;

        public double Revenue { get; set; }


        public GStopDbContext(DbContextOptions options) : base(options)
        {
        }

        protected GStopDbContext()
        {
        }
    }
}
