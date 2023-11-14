using GStop_API.Data.Models.Games;
using System.ComponentModel.DataAnnotations;
using static GStop_API.Common.GeneralAppConstraints.GameConstants;

namespace GStop_API.Data.Models
{
    public class Game
    {
        public Game()
        {
            Likes = new List<Like>();
            Comments = new List<Comment>();
        }
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Name { get; set; } = null!;
        [Required]
        [MinLength(DescriptionMinLength)]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Count { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "yyyy-MM-dd", ApplyFormatInEditMode = true)]
        public DateTime PublishedOn { get; set; }

        public string ImgURL { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
