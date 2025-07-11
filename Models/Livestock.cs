using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
        public class Livestock
        {
            [Key]
            public int LivestockId { get; set; }
 
            [Required(ErrorMessage = "Name is required.")]
            public string Name { get; set; }
 
             [Required(ErrorMessage = "Species is required.")]
            public string Species { get; set; }
 
            [Required(ErrorMessage = "Age is required.")]
            public int Age { get; set; }
 
            [Required(ErrorMessage = "Breed is required.")]
            public string Breed { get; set; }
            public string HealthCondition { get; set; }

            [Required(ErrorMessage = "Location is required.")]
            public string Location { get; set; }
            
            [Required(ErrorMessage = "Vaccination Status is required.")]
            public string VaccinationStatus { get; set; }
            [Required(ErrorMessage = "UserId is required.")]
            public  int UserId{get;set;}
            public User? User{get;set;}
    }
}