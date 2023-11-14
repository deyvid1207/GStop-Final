using GStop_API.Data.Models.Games;
using Microsoft.AspNetCore.Identity;

namespace GStop_API.Data.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser()
        {
            Id = Guid.NewGuid();

            Comments = new List<Comment>();
            Likes = new List<Like>();
        }

        public ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
        public decimal Money { get; set; }
     



    }
}
