 
using System.ComponentModel.DataAnnotations;

namespace GStop_API.DTOs.GameDTOs
{
    public class GameCreateDTO 
    {
        public GameCreateDTO()
        {
            PublishedOn = DateTime.Now;
        }
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }
       public string ImgURL { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        public decimal Price { get; set; }
        [DisplayFormat(DataFormatString = "yyyy-MM-dd", ApplyFormatInEditMode = true)]
        public DateTime PublishedOn { get; set; }

    }
}
