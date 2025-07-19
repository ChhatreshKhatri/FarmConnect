using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(30)]
        public required string Name { get; set; }
    }
}