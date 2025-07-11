using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models{
    public class User{
        [Key]
        public int UserId{get;set;}

        [Required(ErrorMessage="Email is required")]
        [DataType(DataType.EmailAddress)]
        public string Email{get;set;}
        [Required(ErrorMessage="Password is required")]
        [DataType(DataType.Password)]
        public string Password{get;set;}
        [Required(ErrorMessage="Username is required")]
        public string Username{get;set;}
        [Required(ErrorMessage="Mobile Number is required")]
        [DataType(DataType.PhoneNumber)]
        public string MobileNumber{get;set;}
        [Required(ErrorMessage="UserRole is required")]
        public string UserRole{get;set;}
    }
}