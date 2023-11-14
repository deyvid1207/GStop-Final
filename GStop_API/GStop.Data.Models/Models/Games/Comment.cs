 
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static GStop_API.Common.GeneralAppConstraints.GameConstants;


namespace GStop_API.Data.Models
{
    public class Comment
    {
        [Required]
        [ForeignKey("Publisher")]
        public Guid PublisherId { get; set; }
        [Required]
        public ApplicationUser Publisher { get; set; } = null!;
        [Required]
        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; }


        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(CommentContentMinLength)]
        [MaxLength(CommentContentMaxLength)]
        public string Content { get; set; }
        [Required]
        [DisplayFormat(DataFormatString = "yyyy-MM-dd", ApplyFormatInEditMode = true)]
        public DateTime PublishedOn { get; set; }
    }
}
