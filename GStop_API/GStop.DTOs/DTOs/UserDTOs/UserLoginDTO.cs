using System.ComponentModel.DataAnnotations;

namespace GStop_API.DTOs.UserDTOs
{
    public class UserLoginDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
