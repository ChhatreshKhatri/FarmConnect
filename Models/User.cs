using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class User
    {
        [Key]
        public string? UserId { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public required string Username { get; set; }
        [Required(ErrorMessage = "Mobile Number is required")]
        [DataType(DataType.PhoneNumber)]
        public required string MobileNumber { get; set; }
        [Required(ErrorMessage = "UserRole is required")]
        public required string UserRole { get; set; }
    }
}