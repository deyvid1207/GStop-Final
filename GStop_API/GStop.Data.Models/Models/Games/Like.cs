 
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GStop_API.Data.Models.Games
{
    public class Like
    {

        [Key]
        public int Id { get; set; }
        [Required]


        [ForeignKey("Game")]
        public int GameId { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public DateTime LikedOn { get; set; }
        public virtual Game Game { get; set; } = null!;
        public virtual ApplicationUser User { get; set; } = null!;
    }
}
